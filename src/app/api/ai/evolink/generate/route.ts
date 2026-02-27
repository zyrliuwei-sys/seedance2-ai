import { NextRequest, NextResponse } from 'next/server';
import { evolinkAPI } from '@/extensions/ai/evolink';

/**
 * POST /api/ai/evolink/generate
 * Create a video generation task using Evolink API
 *
 * Supported types:
 * - 'text-to-video': Wan 2.6 text to video
 * - 'image-to-video': Wan 2.6 image to video
 * - 'seedance-text': Seedance 1.5 Pro text to video
 * - 'seedance-image': Seedance 1.5 Pro image to video
 * - 'seedance2-text': Seedance 2.0 text to video (with @-reference)
 * - 'seedance2-image': Seedance 2.0 image to video (with @-reference)
 * - 'seedance2-video': Seedance 2.0 video to video editing
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log('[API /evolink/generate] Request body:', {
      ...body,
      prompt: body.prompt?.substring(0, 50) + '...'
    });

    const {
      type,
      prompt,
      imageUrl,
      imageUrls,
      videoUrls,
      audioUrls,
      duration = 5,
      aspectRatio = '16:9',
      quality = '720p',
      shotType = 'single',
      promptExtend = true,
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

    if (!prompt) {
      return NextResponse.json(
        { error: 'Missing required field: prompt' },
        { status: 400 }
      );
    }

    console.log('[API /evolink/generate] Calling Evolink API...', {
      type,
      duration,
      aspectRatio,
      quality,
    });

    // Create video generation task based on type
    let result;
    switch (type) {
      case 'text-to-video':
        result = await evolinkAPI.textToVideo({
          prompt,
          duration,
          aspectRatio,
          quality,
          promptExtend,
          shotType,
          callbackUrl,
        });
        break;

      case 'image-to-video':
        if (!imageUrl) {
          return NextResponse.json(
            { error: 'Missing required field: imageUrl for image-to-video' },
            { status: 400 }
          );
        }
        result = await evolinkAPI.imageToVideo({
          imageUrl,
          prompt,
          duration,
          aspectRatio,
          quality,
          promptExtend,
          shotType,
          callbackUrl,
        });
        break;

      case 'seedance-text':
        result = await evolinkAPI.seedanceTextToVideo({
          prompt,
          duration,
          aspectRatio,
          quality,
          generateAudio,
          callbackUrl,
        });
        break;

      case 'seedance-image':
        if (!imageUrls || imageUrls.length === 0) {
          return NextResponse.json(
            { error: 'Missing required field: imageUrls for seedance-image' },
            { status: 400 }
          );
        }
        result = await evolinkAPI.seedanceImageToVideo({
          prompt,
          imageUrls,
          duration,
          aspectRatio,
          quality,
          generateAudio,
          callbackUrl,
        });
        break;

      case 'seedance2-text':
        result = await evolinkAPI.seedance2TextToVideo({
          prompt,
          duration,
          aspectRatio,
          quality,
          generateAudio,
          callbackUrl,
          imageUrls,
          videoUrls,
          audioUrls,
        });
        break;

      case 'seedance2-image':
        if (!imageUrls || imageUrls.length === 0) {
          return NextResponse.json(
            { error: 'Missing required field: imageUrls for seedance2-image' },
            { status: 400 }
          );
        }
        result = await evolinkAPI.seedance2ImageToVideo({
          prompt,
          imageUrls,
          duration,
          aspectRatio,
          quality,
          generateAudio,
          callbackUrl,
          videoUrls,
          audioUrls,
        });
        break;

      case 'seedance2-video':
        if (!videoUrls || videoUrls.length === 0) {
          return NextResponse.json(
            { error: 'Missing required field: videoUrls for seedance2-video' },
            { status: 400 }
          );
        }
        result = await evolinkAPI.seedance2VideoToVideo({
          prompt,
          videoUrls,
          duration,
          aspectRatio,
          quality,
          generateAudio,
          callbackUrl,
          imageUrls,
          audioUrls,
        });
        break;

      default:
        return NextResponse.json(
          {
            error: `Invalid type: ${type}. Supported types: 'text-to-video', 'image-to-video', 'seedance-text', 'seedance-image', 'seedance2-text', 'seedance2-image', 'seedance2-video'`
          },
          { status: 400 }
        );
    }

    console.log('[API /evolink/generate] Evolink API result:', {
      id: result.id,
      status: result.status,
      progress: result.progress,
    });

    return NextResponse.json({
      success: true,
      taskId: result.id,
      status: result.status,
      progress: result.progress,
      estimatedTime: result.task_info?.estimated_time,
      videoDuration: result.task_info?.video_duration,
    });
  } catch (error: any) {
    console.error('[API /evolink/generate] Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to create video generation task',
        details: error.message,
      },
      { status: 500 }
    );
  }
}
