import Replicate from 'replicate';

import { getUuid } from '@/shared/lib/hash';

import { saveFiles } from '.';
import {
  AIConfigs,
  AIFile,
  AIGenerateParams,
  AIImage,
  AIMediaType,
  AIProvider,
  AISong,
  AITaskResult,
  AITaskStatus,
  AIVideo,
} from './types';

/**
 * Replicate configs
 * @docs https://replicate.com/
 */
export interface ReplicateConfigs extends AIConfigs {
  baseUrl?: string;
  apiToken: string;
  customStorage?: boolean; // use custom storage to save files
}

/**
 * Replicate provider
 * @docs https://replicate.com/
 */
export class ReplicateProvider implements AIProvider {
  // provider name
  readonly name = 'replicate';
  // provider configs
  configs: ReplicateConfigs;

  client: Replicate;

  // init provider
  constructor(configs: ReplicateConfigs) {
    this.configs = configs;
    this.client = new Replicate({
      auth: this.configs.apiToken,
    });
  }

  // generate task
  async generate({
    params,
  }: {
    params: AIGenerateParams;
  }): Promise<AITaskResult> {
    const { mediaType, model, prompt, options, async, callbackUrl } = params;

    if (!mediaType) {
      throw new Error('mediaType is required');
    }

    if (!model) {
      throw new Error('model is required');
    }

    if (!prompt) {
      throw new Error('prompt is required');
    }

    // build request params
    const input: any = this.formatInput({
      mediaType,
      model,
      prompt,
      options,
    });

    const isValidCallbackUrl =
      callbackUrl &&
      callbackUrl.startsWith('http') &&
      !callbackUrl.includes('localhost') &&
      !callbackUrl.includes('127.0.0.1');

    console.log('replicate input', input);

    const output = await this.client.predictions.create({
      model,
      input,
      webhook: isValidCallbackUrl ? callbackUrl : undefined,
      webhook_events_filter: isValidCallbackUrl ? ['completed'] : undefined,
    });

    return {
      taskStatus: AITaskStatus.PENDING,
      taskId: output.id,
      taskInfo: {},
      taskResult: output,
    };
  }

  // query task
  async query({
    taskId,
    mediaType,
  }: {
    taskId: string;
    mediaType?: AIMediaType;
  }): Promise<AITaskResult> {
    const data = await this.client.predictions.get(taskId);

    console.log('[ReplicateProvider] Raw prediction data:', JSON.stringify({
      id: data.id,
      status: data.status,
      output: data.output,
      outputType: typeof data.output,
    }, null, 2));

    let images: AIImage[] | undefined = undefined;
    let videos: AIVideo[] | undefined = undefined;

    if (data.output) {
      if (mediaType === AIMediaType.VIDEO) {
        // handle video output
        const extractVideoUrl = (output: any): string | null => {
          if (!output) return null;
          if (typeof output === 'string') {
            // Direct URL string
            if (output.includes('http')) return output;
            return null;
          }
          if (Array.isArray(output)) {
            // Array of outputs
            for (const item of output) {
              if (typeof item === 'string' && item.includes('http')) return item;
              if (typeof item === 'object' && item !== null) {
                // Check common URL properties
                const url = item.url ?? item.video_url ?? item.videoUrl ?? item.output;
                if (url && typeof url === 'string' && url.includes('http')) return url;
              }
            }
            return null;
          }
          if (typeof output === 'object' && output !== null) {
            // Object output
            const url = output.url ?? output.video_url ?? output.videoUrl ?? output.output;
            if (url && typeof url === 'string' && url.includes('http')) return url;
            // Check all string values that look like URLs
            for (const val of Object.values(output)) {
              if (typeof val === 'string' && val.includes('http')) return val;
            }
          }
          return null;
        };

        const videoUrl = extractVideoUrl(data.output);
        if (videoUrl) {
          videos = [{
            id: '',
            createTime: new Date(data.created_at),
            videoUrl,
          }];
        }
        console.log('[ReplicateProvider] Extracted video URL:', videoUrl);
      } else {
        // handle image output (default)
        if (Array.isArray(data.output)) {
          images = data.output.map((image: any) => ({
            id: '',
            createTime: new Date(data.created_at),
            imageUrl: image,
          }));
        } else if (typeof data.output === 'string') {
          images = [
            {
              id: '',
              createTime: new Date(data.created_at),
              imageUrl: data.output,
            },
          ];
        }
      }
    }

    const taskStatus = this.mapStatus(data.status);

    // save files to custom storage
    if (taskStatus === AITaskStatus.SUCCESS && this.configs.customStorage) {
      // save images
      if (images && images.length > 0) {
        const filesToSave: AIFile[] = [];
        images.forEach((image, index) => {
          if (image.imageUrl) {
            filesToSave.push({
              url: image.imageUrl,
              contentType: 'image/png',
              key: `replicate/image/${getUuid()}.png`,
              index: index,
              type: 'image',
            });
          }
        });

        if (filesToSave.length > 0) {
          const uploadedFiles = await saveFiles(filesToSave);
          if (uploadedFiles) {
            uploadedFiles.forEach((file: AIFile) => {
              if (file && file.url && images && file.index !== undefined) {
                const image = images[file.index];
                if (image) {
                  image.imageUrl = file.url;
                }
              }
            });
          }
        }
      }

      // save videos
      if (videos && videos.length > 0) {
        const filesToSave: AIFile[] = [];
        videos.forEach((video, index) => {
          if (video.videoUrl) {
            filesToSave.push({
              url: video.videoUrl,
              contentType: 'video/mp4',
              key: `replicate/video/${getUuid()}.mp4`,
              index: index,
              type: 'video',
            });
          }
        });

        if (filesToSave.length > 0) {
          const uploadedFiles = await saveFiles(filesToSave);
          if (uploadedFiles) {
            uploadedFiles.forEach((file: AIFile) => {
              if (file && file.url && videos && file.index !== undefined) {
                const video = videos[file.index];
                if (video) {
                  video.videoUrl = file.url;
                }
              }
            });
          }
        }
      }
    }

    return {
      taskId,
      taskStatus,
      taskInfo: {
        images,
        videos,
        status: data.status,
        errorCode: '',
        errorMessage: data.error as string,
        createTime: new Date(data.created_at),
      },
      taskResult: data,
    };
  }

  // map status
  private mapStatus(status: string): AITaskStatus {
    switch (status) {
      case 'starting':
        return AITaskStatus.PENDING;
      case 'processing':
        return AITaskStatus.PROCESSING;
      case 'succeeded':
        return AITaskStatus.SUCCESS;
      case 'failed':
        return AITaskStatus.FAILED;
      case 'canceled':
        return AITaskStatus.CANCELED;
      default:
        throw new Error(`unknown status: ${status}`);
    }
  }

  private formatInput({
    mediaType,
    model,
    prompt,
    options,
  }: {
    mediaType: AIMediaType;
    model: string;
    prompt: string;
    options: any;
  }): any {
    let input: any = {
      prompt,
    };

    if (!options) {
      return input;
    }

    // input with all custom options
    input = {
      ...input,
      ...options,
    };

    // default options
    // image_input
    // duration
    // aspect_ratio

    // image_input transform
    if (options.image_input && Array.isArray(options.image_input)) {
      if (['black-forest-labs/flux-2-pro'].includes(model)) {
        input.input_images = options.image_input;
        delete input.image_input;
      } else if (['google/veo-3.1'].includes(model)) {
        input.reference_images = input.image_input;
        delete input.image_input;
      } else if (['openai/sora-2'].includes(model)) {
        input.input_reference = options.image_input[0];
        delete input.image_input;
      }
    }

    // duration transform
    if (options.duration) {
      if (['openai/sora-2'].includes(model)) {
        input.seconds = Number(options.duration);
        delete input.duration;
      }
    }

    return input;
  }
}

// Replicate API singleton for video generation
class ReplicateAPI {
  private getProvider() {
    const apiToken = process.env.REPLICATE_API_TOKEN;
    if (!apiToken) {
      throw new Error('REPLICATE_API_TOKEN is not set');
    }
    return new ReplicateProvider({
      apiToken,
      customStorage: false,
    });
  }

  async textToVideo(params: {
    prompt: string;
    aspectRatio?: '16:9' | '9:16' | '1:1';
    duration?: number;
  }) {
    const provider = this.getProvider();
    return provider.generate({
      params: {
        mediaType: 'video' as any,
        model: 'wan-video/wan-2.5-t2v',
        prompt: params.prompt,
        options: {
          aspect_ratio: params.aspectRatio || '16:9',
          num_videos: 1,
        },
      },
    });
  }

  async imageToVideo(params: {
    prompt: string;
    imageUrl: string;
    duration?: number;
  }) {
    const provider = this.getProvider();
    return provider.generate({
      params: {
        mediaType: 'video' as any,
        model: 'wan-video/wan-2.5-i2v',
        prompt: params.prompt,
        options: {
          image: params.imageUrl,
        },
      },
    });
  }

  async getPredictionStatus(taskId: string) {
    const provider = this.getProvider();
    const result = await provider.query({
      taskId,
      mediaType: 'video' as any,
    });

    // Transform to match expected format
    return {
      id: result.taskId,
      status: result.taskStatus,
      progress: result.taskInfo?.status === 'processing' ? 0.5 : 1,
      output: result.taskResult?.output,
      error: result.taskInfo?.errorMessage,
    };
  }
}

export const replicateAPI = new ReplicateAPI();
