import {createClientLogger} from '@/lib/logger';
import type {NextRequest} from 'next/server';
import type {ZodSchema} from 'zod';

const log = createClientLogger('badge/handler');

const BADGE_CACHE = 'public, max-age=3600, stale-while-revalidate=86400';

export type BadgeRenderer<TParams> = (params: TParams) => string;

/**
 * Factory that creates a Next.js GET handler for any badge type.
 * Returns image/svg+xml — no Satori dependency.
 *
 * Usage:
 *   export const GET = createBadgeHandler(labelSchema, labelRenderer);
 */
export function createBadgeHandler<TParams>(
  schema: ZodSchema<TParams>,
  renderer: BadgeRenderer<TParams>,
) {
  return async function GET(req: NextRequest): Promise<Response> {
    try {
      const rawParams = Object.fromEntries(req.nextUrl.searchParams.entries());
      const parsed = schema.safeParse(rawParams);

      if (!parsed.success) {
        return Response.json({error: parsed.error.flatten()}, {status: 400});
      }

      const svg = renderer(parsed.data);

      return new Response(svg, {
        headers: {
          'Content-Type': 'image/svg+xml',
          'Cache-Control': BADGE_CACHE,
          'X-Content-Type-Options': 'nosniff',
        },
      });
    } catch (error) {
      const err = error as Error;
      log.error('Badge render failed', {message: err.message});
      return Response.json(
        {error: 'Internal server error', message: err.message},
        {status: 500},
      );
    }
  };
}
