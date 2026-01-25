import { NextRequest, NextResponse } from 'next/server';
import { evolinkAPI } from '@/extensions/ai/evolink';

/**
 * GET /api/ai/evolink/status?taskId=xxx
 * Query video generation task status from Evolink API
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const taskId = searchParams.get('taskId');

    console.log('[API /evolink/status] Checking task status for:', taskId);

    if (!taskId) {
      return NextResponse.json(
        { error: 'Missing required parameter: taskId' },
        { status: 400 }
      );
    }

    // Get task status from Evolink API
    const result = await evolinkAPI.getTaskStatus(taskId);

    console.log('[API /evolink/status] Evolink API result:', {
      id: result.id,
      status: result.status,
      progress: result.progress,
      hasResult: !!result.result,
    });

    // Format response
    const response = {
      success: true,
      taskId: result.id,
      status: result.status,
      progress: result.progress,
      videoUrl: result.result?.video_url || null,
      coverUrl: result.result?.cover_url || null,
      duration: result.result?.duration || null,
      width: result.result?.width || null,
      height: result.result?.height || null,
      error: result.error,
    };

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('[API /evolink/status] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to get task status',
        details: error.message,
      },
      { status: 500 }
    );
  }
}
