/**
 * Evolink Wan 2.6 AI Video Generation API
 * API Documentation: https://evolink.ai/wan-2-6
 */

interface EvolinkVideoGenerationRequest {
  model: 'wan2.6-text-to-video' | 'wan2.6-image-to-video';
  prompt: string;
  aspect_ratio?: '16:9' | '9:16' | '1:1' | '4:3' | '3:4';
  quality?: '720p' | '1080p';
  duration?: 5 | 10 | 15;
  prompt_extend?: boolean;
  model_params?: {
    shot_type?: 'single' | 'multi';
  };
  audio_url?: string;
  callback_url?: string;
  image_url?: string; // For image-to-video
}

interface EvolinkVideoGenerationResponse {
  created: number;
  id: string;
  model: string;
  object: 'video.generation.task';
  progress: number;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
  task_info: {
    can_cancel: boolean;
    estimated_time: number;
  };
  type: 'video';
  usage: {
    billing_rule: string;
    credits_reserved: number;
    user_group: string;
  };
}

interface EvolinkTaskResponse {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
  progress: number;
  result?: {
    video_url: string;
    cover_url: string;
    duration: number;
    width: number;
    height: number;
  };
  error?: {
    code: string;
    message: string;
  };
}

class EvolinkAPI {
  private apiKey: string;
  private baseURL: string;

  constructor() {
    this.apiKey = process.env.EVOLINK_API_KEY || '';
    this.baseURL = process.env.EVOLINK_API_BASE_URL || 'https://api.evolink.ai/v1';

    if (!this.apiKey) {
      console.warn('Evolink API key is not configured');
    }
  }

  private ensureApiKey() {
    if (!this.apiKey) {
      throw new Error('EVOLINK_API_KEY is not set');
    }
  }

  /**
   * Create a video generation task
   */
  async createVideoGeneration(
    params: EvolinkVideoGenerationRequest
  ): Promise<EvolinkVideoGenerationResponse> {
    try {
      this.ensureApiKey();
      console.log('[Evolink API] Creating video generation task:', {
        url: `${this.baseURL}/videos/generations`,
        params: { ...params, prompt: params.prompt?.substring(0, 50) + '...' }
      });

      const response = await fetch(`${this.baseURL}/videos/generations`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      console.log('[Evolink API] Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[Evolink API] Error response:', errorText);
        throw new Error(`Evolink API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('[Evolink API] Success response:', data);
      return data;
    } catch (error) {
      console.error('[Evolink API] Failed to create video generation task:', error);

      // Type guard to handle different error types safely
      const errorObj = error as any;
      if (
        errorObj &&
        typeof errorObj === 'object' &&
        'message' in errorObj &&
        'status' in errorObj
      ) {
        const errorDetails = {
          message: errorObj.message,
          status: errorObj.status,
          ...(errorObj.stack && { stack: errorObj.stack })
        };

        console.error('[Evolink API] Error details:', errorDetails);

        throw new Error(
          `Evolink API error: ${errorObj.status || 'UNKNOWN'} - ${errorDetails.message || 'Unknown error'}`
        );
      } else {
        // Fallback for unexpected error types
        const errorMessage = error instanceof Error
          ? error.message
          : (error as any).toString?.substring(0, 200);

        console.error('[Evolink API] Unexpected error:', {
          error,
          stack: (error as any).stack
        });

        throw new Error(
          `Evolink API error: ${errorMessage}`
        );
      }
    }
  }

  /**
   * Query task status
   */
  async getTaskStatus(taskId: string): Promise<EvolinkTaskResponse> {
    try {
      this.ensureApiKey();

      console.log('[Evolink API] Getting task status:', taskId);
      console.log('[Evolink API] API Key:', this.apiKey ? 'Set (hidden)' : 'Not set');
      console.log('[Evolink API] Base URL:', this.baseURL);

      const response = await fetch(
        `${this.baseURL}/videos/generations/${taskId}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('[Evolink API] Status response status:', response.status);
      console.log('[Evolink API] Status response headers:', Object.fromEntries(response.headers));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[Evolink API] Status error response:', errorText);
        console.error('[Evolink API] Status error response status:', response.status);
        throw new Error(`Evolink API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      // Some evolink responses omit result details on /tasks/:id for completed tasks.
      if (data?.status === 'completed' && !data?.result?.video_url) {
        try {
          const detailResponse = await fetch(
            `${this.baseURL}/videos/generations/${taskId}`,
            {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json',
              },
            }
          );

          if (detailResponse.ok) {
            const detailData = await detailResponse.json();
            if (detailData?.result?.video_url) {
              return {
                ...data,
                result: detailData.result,
              };
            }
          }
        } catch (detailError) {
          console.warn('[Evolink API] Failed to fetch generation details:', detailError);
        }
      }
      console.log('[Evolink API] Status response parsed successfully:', {
        id: data.id,
        status: data.status,
        progress: data.progress,
        hasResult: !!data.result,
        videoUrl: data.result?.video_url
      });
      return data;
    } catch (error) {
      console.error('[Evolink API] Failed to get task status:', error);

      // Type guard to handle different error types safely
      const errorObj = error as any;
      const errorMessage =
        error instanceof Error
          ? error.message
          : errorObj?.toString?.().substring(0, 200);
      const errorStatus = errorObj?.status || 'UNKNOWN';

      console.error('[Evolink API] Error details:', {
        message: errorMessage,
        status: errorStatus,
        stack: errorObj?.stack,
      });

      throw new Error(
        `Evolink API error: ${errorStatus} - ${errorMessage || 'Unknown error'}`
      );
    }
  }

  /**
   * Cancel a task
   */
  async cancelTask(taskId: string): Promise<{ success: boolean }> {
    try {
      this.ensureApiKey();
      const response = await fetch(
        `${this.baseURL}/videos/generations/${taskId}/cancel`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Evolink API error: ${response.status} - ${error}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to cancel task:', error);
      throw error;
    }
  }

  /**
   * Text to Video
   */
  async textToVideo(params: {
    prompt: string;
    aspectRatio?: '16:9' | '9:16' | '1:1' | '4:3' | '3:4';
    quality?: '720p' | '1080p';
    duration?: 5 | 10 | 15;
    promptExtend?: boolean;
    shotType?: 'single' | 'multi';
    audioUrl?: string;
    callbackUrl?: string;
  }): Promise<EvolinkVideoGenerationResponse> {
    return this.createVideoGeneration({
      model: 'wan2.6-text-to-video',
      prompt: params.prompt,
      aspect_ratio: params.aspectRatio || '16:9',
      quality: params.quality || '720p',
      duration: params.duration || 5,
      prompt_extend: params.promptExtend !== false,
      model_params: {
        shot_type: params.shotType || 'single',
      },
      audio_url: params.audioUrl,
      callback_url: params.callbackUrl,
    });
  }

  /**
   * Image to Video
   */
  async imageToVideo(params: {
    imageUrl: string;
    prompt?: string;
    aspectRatio?: '16:9' | '9:16' | '1:1' | '4:3' | '3:4';
    quality?: '720p' | '1080p';
    duration?: 5 | 10 | 15;
    promptExtend?: boolean;
    shotType?: 'single' | 'multi';
    audioUrl?: string;
    callbackUrl?: string;
  }): Promise<EvolinkVideoGenerationResponse> {
    return this.createVideoGeneration({
      model: 'wan2.6-image-to-video',
      prompt: params.prompt || 'Animate this image',
      image_url: params.imageUrl,
      aspect_ratio: params.aspectRatio || '16:9',
      quality: params.quality || '720p',
      duration: params.duration || 5,
      prompt_extend: params.promptExtend !== false,
      model_params: {
        shot_type: params.shotType || 'single',
      },
      audio_url: params.audioUrl,
      callback_url: params.callbackUrl,
    });
  }
}

// Export singleton instance
export const evolinkAPI = new EvolinkAPI();

// Export types
export type {
  EvolinkVideoGenerationRequest,
  EvolinkVideoGenerationResponse,
  EvolinkTaskResponse,
};
