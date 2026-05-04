import {createClientLogger} from '@/lib/logger';
import {resolveOgFonts} from '@/modules/og/server/og-fonts.server';
import type {
  OgRenderer,
  OgRendererContext,
} from '@/modules/og/server/og-handler.server';
import {resolveCacheControl} from '@/modules/og/server/og-render.server';
import {resolveTheme} from '@/modules/og/server/og-themes.server';
import {ImageResponse} from 'next/og';
import {type NextRequest} from 'next/server';
import type {ZodSchema} from 'zod';

export type {
  OgRenderer,
  OgRendererContext,
} from '@/modules/og/server/og-handler.server';

const log = createClientLogger('seo/handler');

/**
 * Factory for SEO asset routes. Unlike createOgHandler, dimensions are
 * passed explicitly — SEO assets have fixed sizes per spec (32px favicon,
 * 180px apple-touch-icon, etc.) rather than using the `target` query param.
 */
export function createSeoHandler<TParams>(
  schema: ZodSchema<TParams>,
  renderer: OgRenderer<TParams>,
  width: number,
  height: number,
) {
  return async function GET(req: NextRequest): Promise<Response> {
    try {
      const rawParams = Object.fromEntries(req.nextUrl.searchParams.entries());
      const parsed = schema.safeParse(rawParams);

      if (!parsed.success) {
        return Response.json({error: parsed.error.flatten()}, {status: 400});
      }

      const p = parsed.data;
      const theme = resolveTheme(
        (p as {theme?: 'dark' | 'light' | 'auto'}).theme ?? 'dark',
      );

      // Pre-fetch logo image if present
      const resolved = await resolveLogoParam(p as Record<string, unknown>);

      const element = renderer(resolved as TParams, {
        theme,
        width,
        height,
      } satisfies OgRendererContext);

      // Always load at least one font — ImageResponse requires it even for tiny icons
      const fonts = await resolveOgFonts('geist').catch(() => []);

      return new ImageResponse(element, {
        width,
        height,
        fonts,
        headers: {'Cache-Control': resolveCacheControl(rawParams)},
      });
    } catch (error) {
      const err = error as Error;
      log.error('SEO render failed', {message: err.message});
      return Response.json(
        {error: 'Internal server error', message: err.message},
        {status: 500},
      );
    }
  };
}

export async function resolveLogoParam(
  params: Record<string, unknown>,
): Promise<Record<string, unknown>> {
  const logo = params['logo'];
  if (typeof logo !== 'string' || !logo.startsWith('http')) return params;
  try {
    const res = await fetch(logo, {headers: {Accept: 'image/*'}});
    if (!res.ok) return params;
    const mime = res.headers.get('content-type') ?? 'image/png';
    const buffer = await res.arrayBuffer();
    const b64 = Buffer.from(buffer).toString('base64');
    return {...params, logo: `data:${mime};base64,${b64}`};
  } catch {
    return params;
  }
}
