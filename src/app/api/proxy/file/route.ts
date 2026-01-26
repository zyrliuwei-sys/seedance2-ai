import { NextRequest, NextResponse } from 'next/server';

const isHttpUrl = (value: string) => {
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
};

const extractUrlDeep = (value: any, visited = new Set<any>()): string | null => {
  if (!value || visited.has(value)) return null;
  if (typeof value === 'string') return isHttpUrl(value) ? value : null;
  if (typeof value !== 'object') return null;

  visited.add(value);

  if (Array.isArray(value)) {
    for (const item of value) {
      const url = extractUrlDeep(item, visited);
      if (url) return url;
    }
    return null;
  }

  const direct =
    value.download_url ??
    value.url ??
    value.uri ??
    value.video_url ??
    value.videoUrl ??
    value.file ??
    value.src;
  if (typeof direct === 'string' && isHttpUrl(direct)) return direct;

  for (const val of Object.values(value)) {
    const url = extractUrlDeep(val, visited);
    if (url) return url;
  }

  return null;
};

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');

  if (!url) {
    return new NextResponse('Missing url parameter', { status: 400 });
  }

  try {
    const evolinkBase = process.env.EVOLINK_API_BASE_URL || '';
    const evolinkKey = process.env.EVOLINK_API_KEY || '';
    const evolinkHost = evolinkBase ? new URL(evolinkBase).host : '';

    const fetchWithAuth = async (target: string) => {
      const headers: Record<string, string> = {};
      if (evolinkKey && evolinkHost && new URL(target).host === evolinkHost) {
        headers.Authorization = `Bearer ${evolinkKey}`;
      }
      return fetch(target, { headers });
    };

    if (!isHttpUrl(url)) {
      if (!evolinkBase || !evolinkKey) {
        return new NextResponse('Invalid url parameter', { status: 400 });
      }

      const fileId = url.trim();
      const candidates = [
        `${evolinkBase}/files/${fileId}`,
        `${evolinkBase}/files/${fileId}/download`,
      ];

      for (const candidate of candidates) {
        const candidateResponse = await fetchWithAuth(candidate);
        if (!candidateResponse.ok) {
          continue;
        }

        const contentType =
          candidateResponse.headers.get('content-type') ||
          'application/octet-stream';

        if (contentType.includes('application/json')) {
          const data = await candidateResponse.json();
          const resolved = extractUrlDeep(data);
          if (!resolved) {
            continue;
          }
          const resolvedResponse = await fetchWithAuth(resolved);
          if (!resolvedResponse.ok) {
            continue;
          }
          return new NextResponse(resolvedResponse.body, {
            headers: {
              'Content-Type':
                resolvedResponse.headers.get('content-type') ||
                'application/octet-stream',
            },
          });
        }

        return new NextResponse(candidateResponse.body, {
          headers: {
            'Content-Type': contentType,
          },
        });
      }

      return new NextResponse('Failed to resolve file id', { status: 404 });
    }

    const response = await fetchWithAuth(url);

    if (!response.ok) {
      return new NextResponse(`Failed to fetch file: ${response.statusText}`, {
        status: response.status,
      });
    }

    const contentType =
      response.headers.get('content-type') || 'application/octet-stream';

    return new NextResponse(response.body, {
      headers: {
        'Content-Type': contentType,
      },
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
