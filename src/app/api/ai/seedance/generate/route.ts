import { NextRequest, NextResponse } from 'next/server';
import { evolinkAPI } from '@/extensions/ai/evolink';

/**
 * POST /api/ai/seedance/generate
 * Create a video generation task using Evolink Seedance 1.5 Pro API
 *
 * Request body:
 * {
 *   type: 'text-to-video' | 'image-to-video',
 *   prompt: string, // Required for text-to-video
 *   imageUrls: string[], // Required for image-to-video (1-2 images)
 *   duration?: number, // 4-12 seconds, default 5
 *   quality?: '480p' | '720p' | '1080p', // default '720p'
 *   aspectRatio?: '16:9' | '9:16' | '1:1' | '4:3' | '3:4' | '21:9' | 'adaptive', // default '16:9'
 *   generateAudio?: boolean, // default true
 *   callbackUrl?: string // HTTPS callback URL
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log('[API /seedance/generate] Request body:', {
      ...body,
      prompt: body.prompt?.substring(0, 50) + '...'
    });

    const {
      type, // 'text-to-video' | 'image-to-video'
      prompt,
      imageUrls,
      duration = 5,
      quality = '720p',
      aspectRatio = '16:9',
      generateAudio = true,
      callbackUrl,
    } = body;

    // Validate required fields
    if (!type) {
      return NextResponse.json(
        { error: 'Missing required field: type' },
        { status: 400 }
      );
    }

    if (type === 'text-to-video' && !prompt) {
      return NextResponse.json(
        { error: 'Missing required field: prompt for text-to-video' },
        { status: 400 }
      );
    }

    if (type === 'image-to-video' && (!imageUrls || !Array.isArray(imageUrls) || imageUrls.length === 0)) {
      return NextResponse.json(
        { error: 'Missing required field: imageUrls (array of 1-2 image URLs) for image-to-video' },
        { status: 400 }
      );
    }

    if (type === 'image-to-video' && imageUrls.length > 2) {
      return NextResponse.json(
        { error: 'Maximum 2 images allowed per request' },
        { status: 400 }
      );
    }

    // Validate duration range
    if (duration < 4 || duration > 12) {
      return NextResponse.json(
        { error: 'Duration must be between 4 and 12 seconds' },
        { status: 400 }
      );
    }

    console.log('[API /seedance/generate] Calling Evolink Seedance 1.5 Pro API...', {
      type,
      duration,
      quality,
      aspectRatio,
      generateAudio,
    });

    // Create video generation task
    let result;
    if (type === 'text-to-video') {
      result = await evolinkAPI.seedanceTextToVideo({
        prompt,
        duration,
        quality,
        aspectRatio,
        generateAudio,
        callbackUrl,
      });
    } else if (type === 'image-to-video') {
      result = await evolinkAPI.seedanceImageToVideo({
        prompt: prompt || 'Animate these images',
        imageUrls,
        duration,
        quality,
        aspectRatio,
        generateAudio,
        callbackUrl,
      });
    } else {
      return NextResponse.json(
        { error: `Invalid type: ${type}. Must be 'text-to-video' or 'image-to-video'` },
        { status: 400 }
      );
    }

    console.log('[API /seedance/generate] Evolink API result:', {
      id: result.id,
      status: result.status,
      progress: result.progress,
      estimatedTime: result.task_info?.estimated_time,
    });

    return NextResponse.json({
      success: true,
      taskId: result.id,
      status: result.status,
      progress: result.progress,
      estimatedTime: result.task_info?.estimated_time,
      usage: result.usage,
    });
  } catch (error: any) {
    console.error('[API /seedance/generate] Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to create Seedance 1.5 Pro video generation task',
        details: error.message,
      },
      { status: 500 }
    );
  }
}
