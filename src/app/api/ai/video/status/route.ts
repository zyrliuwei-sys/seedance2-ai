import { NextRequest, NextResponse } from 'next/server';

import { evolinkAPI } from '@/extensions/ai/evolink';
import { replicateAPI } from '@/extensions/ai/replicate';

const extractVideoUrl = (value: any): string | null => {
  if (!value) return null;
  if (typeof value === 'string') return value;
  if (typeof value !== 'object') return null;

  const candidate =
    value.video_url ??
    value.videoUrl ??
    value.url ??
    value.uri ??
    value.video ??
    value.src;
  return typeof candidate === 'string' ? candidate : null;
};

const normalizeReplicateOutput = (output: any) => {
  if (!output) return null;
  if (typeof output === 'string') return output;
  if (Array.isArray(output)) {
    for (const item of output) {
      const url = extractVideoUrl(item);
      if (url) return url;
    }
    return null;
  }
  return extractVideoUrl(output);
};

const buildErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  return String(error);
};

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const taskId = searchParams.get('taskId');
    const provider = searchParams.get('provider');

    if (!taskId || !provider) {
      return NextResponse.json(
        { success: false, error: 'Missing required parameters: taskId, provider' },
        { status: 400 }
      );
    }

    if (provider === 'evolink') {
      const result = await evolinkAPI.getTaskStatus(taskId);

      console.log('[API /video/status] Evolink result:', {
        id: result.id,
        status: result.status,
        progress: result.progress,
        hasResult: !!result.result,
        resultKeys: result.result ? Object.keys(result.result) : [],
        videoUrl: result.result?.video_url,
      });

      const videoUrl =
        result.result?.video_url ||
        extractVideoUrl(result.result) ||
        extractVideoUrl(result as any);

      return NextResponse.json({
        success: true,
        provider,
        taskId: result.id,
        status: result.status,
        progress: result.progress,
        videoUrl,
        coverUrl: result.result?.cover_url || null,
        duration: result.result?.duration || null,
        width: result.result?.width || null,
        height: result.result?.height || null,
        error: result.error || null,
      });
    }

    if (provider === 'replicate') {
      const result = await replicateAPI.getPredictionStatus(taskId);
      const videoUrl = normalizeReplicateOutput(result.output);

      return NextResponse.json({
        success: true,
        provider,
        taskId: result.id,
        status: result.status,
        progress: result?.progress ?? null,
        videoUrl,
        error: result?.error || null,
      });
    }

    return NextResponse.json(
      { success: false, error: `Unsupported provider: ${provider}` },
      { status: 400 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to get task status',
        details: buildErrorMessage(error),
      },
      { status: 500 }
    );
  }
}
