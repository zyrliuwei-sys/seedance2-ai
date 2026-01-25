/**
 * Test script for Evolink API
 * Run with: node test-evolink-api.js
 */

async function testEvolinkAPI() {
  const { evolinkAPI } = await import('@/extensions/ai/evolink');

  console.log('===== Testing Evolink API Configuration =====');
  console.log('API Available:', evolinkAPI ? 'Yes' : 'No');

  try {
    // Test text to video
    console.log('\n--- Testing textToVideo ---');
    const createResult = await evolinkAPI.textToVideo({
      prompt: 'Test prompt for video generation',
      aspectRatio: '16:9',
      quality: '720p',
      duration: 5,
    });

    console.log('Create result:', createResult);
    console.log('Create result status:', createResult.status);
    console.log('Create result ID:', createResult.id);

    // Test get task status (with a dummy task ID for testing)
    console.log('\n--- Testing getTaskStatus ---');
    try {
      const statusResult = await evolinkAPI.getTaskStatus('test-task-id-123');
      console.log('Status result:', statusResult);
    } catch (statusError) {
      console.error('Get task status failed:', statusError);
    }

    return {
      success: true,
      message: 'Evolink API test completed successfully',
    };
  } catch (error: any) {
    return {
      success: false,
      message: 'Evolink API test failed',
      error: error?.message || 'Unknown error'
    };
  }
}

export { testEvolinkAPI as default };
