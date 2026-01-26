import { NextRequest, NextResponse } from 'next/server';

import { evolinkAPI } from '@/extensions/ai/evolink';
import { replicateAPI } from '@/extensions/ai/replicate';

const buildErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  return String(error);
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      type, // 'text-to-video' | 'image-to-video'
      prompt,
      imageUrl,
      aspectRatio = '16:9',
      quality = '720p',
      duration = 5,
      promptExtend = true,
      shotType = 'single',
      audioUrl,
      callbackUrl,
    } = body;

    if (!type) {
      return NextResponse.json(
        { success: false, error: 'Missing required field: type' },
        { status: 400 }
      );
    }

    if (type === 'text-to-video' && !prompt) {
      return NextResponse.json(
        { success: false, error: 'Missing required field: prompt for text-to-video' },
        { status: 400 }
      );
    }

    if (type === 'image-to-video' && !imageUrl) {
      return NextResponse.json(
        { success: false, error: 'Missing required field: imageUrl for image-to-video' },
        { status: 400 }
      );
    }

    const errors: string[] = [];

    if (process.env.EVOLINK_API_KEY) {
      try {
        const result =
          type === 'text-to-video'
            ? await evolinkAPI.textToVideo({
                prompt,
                aspectRatio,
                quality,
                duration,
                promptExtend,
                shotType,
                audioUrl,
                callbackUrl,
              })
            : await evolinkAPI.imageToVideo({
                imageUrl,
                prompt,
                aspectRatio,
                quality,
                duration,
                promptExtend,
                shotType,
                audioUrl,
                callbackUrl,
              });

        if (result.status === 'failed' || result.status === 'cancelled') {
          let failureDetail = '';
          try {
            const statusResult = await evolinkAPI.getTaskStatus(result.id);
            const errorMessage =
              statusResult.error?.message || statusResult.error?.code || '';
            if (errorMessage) failureDetail = `: ${errorMessage}`;
          } catch {
            // Ignore status fetch failures; use a generic message.
          }
          throw new Error(`Evolink task failed on create${failureDetail}`);
        }

        return NextResponse.json({
          success: true,
          provider: 'evolink',
          taskId: result.id,
          status: result.status,
          estimatedTime: result.task_info?.estimated_time,
          creditsReserved: result.usage?.credits_reserved,
        });
      } catch (error) {
        errors.push(`evolink: ${buildErrorMessage(error)}`);
      }
    }

    if (process.env.REPLICATE_API_TOKEN) {
      try {
        const result =
          type === 'text-to-video'
            ? await replicateAPI.textToVideo({
                prompt,
                duration,
              })
            : await replicateAPI.imageToVideo({
                prompt: prompt || 'Animate this image',
                imageUrl,
                duration,
              });

        return NextResponse.json({
          success: true,
          provider: 'replicate',
          taskId: result.taskId,
          status: result.taskStatus,
        });
      } catch (error) {
        errors.push(`replicate: ${buildErrorMessage(error)}`);
      }
    }

    return NextResponse.json(
      {
        success: false,
        error: 'No available provider could create the task',
        details: errors.join(' | ') || 'Missing API keys for video providers',
      },
      { status: 500 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create video generation task',
        details: buildErrorMessage(error),
      },
      { status: 500 }
    );
  }
}
