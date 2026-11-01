import { auth } from '@clerk/nextjs/server';
import { createHash, createHmac, randomUUID } from 'node:crypto';
import { NextRequest } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const allowedRoutes: Record<string, ReadonlySet<string>> = {
  '/api/v1/dashboard': new Set(['GET']),
  '/api/v1/product': new Set(['GET']),
  '/api/v1/product/add': new Set(['POST']),
  '/api/v1/product/update': new Set(['POST']),
  '/api/v1/product/delete': new Set(['POST']),
  '/api/v1/product/buy': new Set(['POST']),
  '/api/v1/product/sell': new Set(['POST']),
  '/api/v1/supplier': new Set(['GET']),
  '/api/v1/supplier/add': new Set(['POST']),
  '/api/v1/supplier/update': new Set(['POST']),
  '/api/v1/supplier/delete': new Set(['POST']),
  '/api/v1/transcation': new Set(['GET']),
  '/api/v1/ai/query': new Set(['POST']),
};

async function handle(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const { userId } = await auth();
  if (!userId) return Response.json({ msg: 'Unauthorized' }, { status: 401 });

  const { path } = await context.params;
  const endpoint = '/' + path.join('/');
  if (!allowedRoutes[endpoint]?.has(request.method)) {
    return Response.json({ msg: 'Not found' }, { status: 404 });
  }
  if (request.method === 'POST') {
    // Same-origin requests only: reject cross-site form submissions / CSRF.
    const origin = request.headers.get('origin');
    if (!origin || origin !== process.env.FRONTEND_ORIGIN) {
      return Response.json({ msg: 'Forbidden' }, { status: 403 });
    }
    if (!request.headers.get('content-type')?.startsWith('application/json')) {
      return Response.json({ msg: 'JSON required' }, { status: 415 });
    }
  }

  const internalUrl = process.env.BACKEND_INTERNAL_URL;
  const secret = process.env.INTERNAL_API_SECRET;
  if (!internalUrl || !secret || !process.env.FRONTEND_ORIGIN) {
    return Response.json({ msg: 'Service not configured' }, { status: 503 });
  }
  const key = Buffer.from(secret, 'base64');
  if (key.length < 32 || key.toString('base64') !== secret) {
    return Response.json({ msg: 'Service not configured' }, { status: 503 });
  }

  const body = request.method === 'POST' ? await request.text() : '';
  if (body.length > 100_000) return Response.json({ msg: 'Payload too large' }, { status: 413 });
  const pathAndQuery = endpoint + request.nextUrl.search;
  const timestamp = String(Date.now());
  const nonce = randomUUID();
  const digest = createHash('sha256').update(body, 'utf8').digest('hex');
  const payload = [request.method, pathAndQuery, userId, timestamp, nonce, digest].join('\n');
  const signature = createHmac('sha256', key).update(payload, 'utf8').digest('hex');

  try {
    const url = new URL(pathAndQuery, internalUrl);
    // Only HTTPS to remote backends. HTTP is permitted for localhost development.
    if (url.protocol !== 'https:' && !['localhost', '127.0.0.1'].includes(url.hostname)) {
      return Response.json({ msg: 'Insecure backend URL' }, { status: 503 });
    }
    const upstream = await fetch(url, {
      method: request.method,
      headers: {
        'Content-Type': 'application/json',
        'x-stockpilot-user': userId,
        'x-stockpilot-timestamp': timestamp,
        'x-stockpilot-nonce': nonce,
        'x-stockpilot-signature': signature,
      },
      body: request.method === 'POST' ? body : undefined,
      cache: 'no-store',
      redirect: 'manual',
      signal: AbortSignal.timeout(20_000),
    });
    // Never forward cookies, redirects or arbitrary response headers from upstream.
    return new Response(upstream.body, {
      status: upstream.status,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    });
  } catch {
    return Response.json({ msg: 'Upstream service unavailable' }, { status: 502 });
  }
}

export const GET = handle;
export const POST = handle;
