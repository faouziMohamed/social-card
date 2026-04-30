import { ImageResponse } from 'next/og';
import { type NextRequest } from 'next/server';
import React from 'react';
import type { ZodSchema } from 'zod';
import { createClientLogger } from '@/lib/logger';
import { resolveOgFonts } from '@/modules/og/server/og-fonts.server';
import { CACHE_CONTROL } from '@/modules/og/server/og-render.server';
import { resolveTheme } from '@/modules/og/server/og-themes.server';
import type { OgRenderer, OgRendererContext } from '@/modules/og/server/og-handler.server';

export type { OgRenderer, OgRendererContext };

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
        return Response.json({ error: parsed.error.flatten() }, { status: 400 });
      }

      const p = parsed.data;
      const theme = resolveTheme(
        (p as { theme?: 'dark' | 'light' | 'auto' }).theme ?? 'dark',
      );

      // Pre-fetch logo image if present
      const resolved = await resolveLogoParam(p as Record<string, unknown>);

      const element = renderer(resolved as TParams, { theme, width, height } satisfies OgRendererContext);

      // Favicon uses a tiny default font — skip font loading for small icons
      const fonts = width >= 64
        ? await resolveOgFonts('geist').catch(() => [])
        : [];

      return new ImageResponse(element, {
        width,
        height,
        fonts,
        headers: { 'Cache-Control': CACHE_CONTROL },
      });
    } catch (error) {
      const err = error as Error;
      log.error('SEO render failed', { message: err.message });
      return Response.json(
        { error: 'Internal server error', message: err.message },
        { status: 500 },
      );
    }
  };
}

async function resolveLogoParam(params: Record<string, unknown>): Promise<Record<string, unknown>> {
  const logo = params['logo'];
  if (typeof logo !== 'string' || !logo.startsWith('http')) return params;
  try {
    const res = await fetch(logo, { headers: { Accept: 'image/*' } });
    if (!res.ok) return params;
    const mime = res.headers.get('content-type') ?? 'image/png';
    const buffer = await res.arrayBuffer();
    const b64 = Buffer.from(buffer).toString('base64');
    return { ...params, logo: `data:${mime};base64,${b64}` };
  } catch {
    return params;
  }
}
