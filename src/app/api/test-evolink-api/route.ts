import { NextRequest, NextResponse } from 'next/server';

import { evolinkAPI } from '@/extensions/ai/evolink';

export async function GET() {
  try {
    // Test the Evolink API configuration
    const hasApiKey = !!process.env.EVOLINK_API_KEY;
    const baseURL = process.env.EVOLINK_API_BASE_URL || 'https://api.evolink.ai/v1';

    if (!hasApiKey) {
      return NextResponse.json({
        success: false,
        message: 'EVOLINK_API_KEY is not configured in .env.local',
        config: { baseURL, hasApiKey: false },
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Evolink API is configured correctly',
      config: {
        baseURL,
        hasApiKey: true,
        keyPrefix: process.env.EVOLINK_API_KEY?.substring(0, 10) + '...',
      },
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: `Test failed: ${error.message}`,
    });
  }
}
