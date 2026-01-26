import { NextRequest, NextResponse } from 'next/server';

import { evolinkAPI } from '@/extensions/ai/evolink';
import { replicateAPI } from '@/extensions/ai/replicate';

const extractVideoUrl = (value: any): string | null => {
  if (!value) return null;
  if (typeof value === 'string') {
    return value.includes('http') ? value : null;
  }
  if (typeof value !== 'object') return null;

  const candidate =
    value.video_url ??
    value.videoUrl ??
    value.url ??
    value.uri ??
    value.video ??
    value.src ??
    value.file ??
    value.download_url;
  if (candidate && typeof candidate === 'string' && candidate.includes('http')) {
    return candidate;
  }
  return null;
};

const findDeepVideoUrl = (value: any, visited = new Set<any>()): string | null => {
  if (!value || visited.has(value)) return null;
  if (typeof value === 'string') {
    if (value.startsWith('http')) return value;
    return null;
  }
  if (typeof value !== 'object') return null;

  visited.add(value);

  if (Array.isArray(value)) {
    for (const item of value) {
      const url = extractVideoUrl(item) || findDeepVideoUrl(item, visited);
      if (url) return url;
    }
    return null;
  }

  const direct = extractVideoUrl(value);
  if (direct) return direct;

  for (const val of Object.values(value)) {
    const url = extractVideoUrl(val) || findDeepVideoUrl(val, visited);
    if (url) return url;
  }

  return null;
};

const normalizeReplicateOutput = (output: any) => {
  console.log('[normalizeReplicateOutput] Input:', JSON.stringify(output, null, 2));

  if (!output) return null;
  if (typeof output === 'string') {
    if (output.includes('http')) {
      console.log('[normalizeReplicateOutput] Direct string URL:', output);
      return output;
    }
    return null;
  }
  if (Array.isArray(output)) {
    console.log('[normalizeReplicateOutput] Output is array with', output.length, 'items');
    for (const item of output) {
      const url = extractVideoUrl(item);
      if (url) {
        console.log('[normalizeReplicateOutput] Found URL in array item:', url);
        return url;
      }
      // Also check if item itself is a string URL
      if (typeof item === 'string' && item.includes('http')) {
        console.log('[normalizeReplicateOutput] Found direct string URL in array:', item);
        return item;
      }
    }
    // If array items are objects, try to get their first property value
    for (const item of output) {
      if (typeof item === 'object' && item !== null) {
        const values = Object.values(item);
        for (const val of values) {
          if (typeof val === 'string' && val.includes('http')) {
            console.log('[normalizeReplicateOutput] Found URL in object value:', val);
            return val;
          }
        }
      }
    }
    return null;
  }
  if (typeof output === 'object') {
    console.log('[normalizeReplicateOutput] Output is object, keys:', Object.keys(output));
    // Try to find URL in object values
    const values = Object.values(output);
    for (const val of values) {
      if (typeof val === 'string' && val.includes('http')) {
        console.log('[normalizeReplicateOutput] Found URL in object value:', val);
        return val;
      }
    }
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
        findDeepVideoUrl(result.result) ||
        findDeepVideoUrl(result as any);

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

      console.log('[API /video/status] Replicate result:', {
        id: result.id,
        status: result.status,
        progress: result.progress,
        hasOutput: !!result.output,
        outputType: typeof result.output,
        output: result.output,
        error: result.error,
      });

      const videoUrl =
        normalizeReplicateOutput(result.output) ||
        findDeepVideoUrl(result.output) ||
        findDeepVideoUrl(result as any);

      console.log('[API /video/status] Extracted videoUrl:', videoUrl);

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
