import { NextResponse } from 'next/server';
import { evolinkAPI } from '@/extensions/ai/evolink';

export async function GET() {
  const results = {
    timestamp: new Date().toISOString(),
    tests: [] as any[],
  };

  // Test 1: Check API key configuration
  try {
    const hasApiKey = !!process.env.EVOLINK_API_KEY;
    const baseURL = process.env.EVOLINK_API_BASE_URL || 'https://api.evolink.ai/v1';

    if (!hasApiKey) {
      results.tests.push({
        name: 'API Key Configuration',
        status: 'FAILED',
        message: 'EVOLINK_API_KEY is not set in environment variables',
      });
      return NextResponse.json({
        success: false,
        ...results,
      });
    }

    results.tests.push({
      name: 'API Key Configuration',
      status: 'PASSED',
      message: 'API key is configured',
      details: {
        baseURL,
        keyPrefix: process.env.EVOLINK_API_KEY?.substring(0, 10) + '...',
      },
    });
  } catch (error: any) {
    results.tests.push({
      name: 'API Key Configuration',
      status: 'FAILED',
      message: error.message,
    });
  }

  // Test 2: Test API connection with Seedance 1.5 Pro
  try {
    console.log('[Test Evolink API] Testing Seedance 1.5 Pro connection...');
    const testResult = await evolinkAPI.seedanceTextToVideo({
      prompt: 'A cat sleeping on a windowsill',
      duration: 4,
      quality: '480p',
      aspectRatio: '16:9',
      generateAudio: false,
    });

    results.tests.push({
      name: 'Seedance 1.5 Pro API Connection',
      status: 'PASSED',
      message: 'Successfully connected to Evolink Seedance 1.5 Pro API',
      details: {
        taskId: testResult.id,
        status: testResult.status,
        progress: testResult.progress,
        estimatedTime: testResult.task_info?.estimated_time,
        usage: testResult.usage,
      },
    });
  } catch (error: any) {
    console.error('[Test Evolink API] Connection test failed:', error);
    results.tests.push({
      name: 'Seedance 1.5 Pro API Connection',
      status: 'FAILED',
      message: error.message,
      details: error.toString(),
    });
  }

  // Overall status
  const allPassed = results.tests.every((t) => t.status === 'PASSED');

  return NextResponse.json({
    success: allPassed,
    ...results,
  });
}
