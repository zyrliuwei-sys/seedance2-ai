import { NextRequest, NextResponse } from 'next/server';
import { evolinkAPI } from '@/extensions/ai/evolink';

/**
 * POST /api/ai/evolink/generate
 * Create a video generation task using Evolink Wan 2.6 API
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log('[API /evolink/generate] Request body:', {
      ...body,
      prompt: body.prompt?.substring(0, 50) + '...'
    });

    const {
      type, // 'text-to-video' | 'image-to-video'
      prompt,
      imageUrl,
      duration = 5,
      aspectRatio = '16:9',
      quality = '720p',
      shotType = 'single',
      promptExtend = true,
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

    if (type === 'image-to-video' && !imageUrl) {
      return NextResponse.json(
        { error: 'Missing required field: imageUrl for image-to-video' },
        { status: 400 }
      );
    }

    console.log('[API /evolink/generate] Calling Evolink API...', {
      type,
      duration,
      aspectRatio,
      quality,
    });

    // Create video generation task
    let result;
    if (type === 'text-to-video') {
      result = await evolinkAPI.textToVideo({
        prompt,
        duration,
        aspectRatio,
        quality,
        promptExtend,
        shotType,
      });
    } else if (type === 'image-to-video') {
      result = await evolinkAPI.imageToVideo({
        imageUrl,
        prompt,
        duration,
        aspectRatio,
        quality,
        promptExtend,
        shotType,
      });
    } else {
      return NextResponse.json(
        { error: `Invalid type: ${type}. Must be 'text-to-video' or 'image-to-video'` },
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
