import {createClientLogger} from '@/lib/logger';
import {resolveCacheControl} from '@/modules/og/server/og-render.server';
import {type NextRequest} from 'next/server';
import type {ZodSchema} from 'zod';

const log = createClientLogger('seo/text-handler');

export function createSeoTextHandler<TParams>(
  schema: ZodSchema<TParams>,
  buildText: (params: TParams) => string,
  contentType = 'text/plain; charset=utf-8',
) {
  return async function GET(req: NextRequest): Promise<Response> {
    try {
      const rawParams = Object.fromEntries(req.nextUrl.searchParams.entries());
      const parsed = schema.safeParse(rawParams);
      if (!parsed.success) {
        return Response.json({error: parsed.error.flatten()}, {status: 400});
      }

      const body = buildText(parsed.data);
      return new Response(body, {
        status: 200,
        headers: {
          'Content-Type': contentType,
          'Cache-Control': resolveCacheControl(rawParams),
        },
      });
    } catch (error) {
      const err = error as Error;
      log.error('SEO text render failed', {message: err.message});
      return Response.json(
        {error: 'Internal server error', message: err.message},
        {status: 500},
      );
    }
  };
}
