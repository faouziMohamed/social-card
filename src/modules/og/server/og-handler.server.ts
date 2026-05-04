import {ImageResponse} from 'next/og';
import {type NextRequest} from 'next/server';
import React from 'react';
import type {ZodSchema} from 'zod';

import {createClientLogger} from '@/lib/logger';
import {resolveOgFonts} from '@/modules/og/server/og-fonts.server';
import {resolveCacheControl} from '@/modules/og/server/og-render.server';
import {
  resolveTheme,
  type ThemePalette,
} from '@/modules/og/server/og-themes.server';
import {TARGET_SIZES} from '@/modules/og/shared/og-schemas';

const log = createClientLogger('og/handler');

export type OgRendererContext = {
  theme: ThemePalette;
  width: number;
  height: number;
};

export type OgRenderer<TParams> = (
  params: TParams,
  ctx: OgRendererContext,
) => React.ReactElement;

/**
 * Factory that creates a Next.js edge GET handler for any OG template.
 * Usage:
 *   export const GET = createOgHandler(generalSchema, generalRenderer);
 */
export function createOgHandler<TParams>(
  schema: ZodSchema<TParams>,
  renderer: OgRenderer<TParams>,
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
      const target = (p as {target?: keyof typeof TARGET_SIZES}).target ?? 'og';
      const {width, height} = TARGET_SIZES[target];
      const fonts = await resolveOgFonts(
        (p as {fontFamily?: string}).fontFamily ?? 'geist',
      );

      // Pre-fetch any URL-valued params → base64 data URLs so Satori receives raw
      // image bytes. This handles WebP, Next.js image-optimization URLs, etc.
      const resolved = await resolveImageParams(p as Record<string, unknown>);

      log.info('OG render', {target, width, height});

      const element = renderer(resolved as TParams, {
        theme,
        width,
        height,
      });

      return new ImageResponse(element, {
        width,
        height,
        fonts,
        headers: {'Cache-Control': resolveCacheControl(rawParams)},
      });
    } catch (error) {
      const err = error as Error;
      log.error('OG render failed', {message: err.message});
      return Response.json(
        {error: 'Internal server error', message: err.message},
        {status: 500},
      );
    }
  };
}

// ─── Image param resolution ────────────────────────────────────────────────────

// Known image param keys across all renderers. Only these are pre-fetched.
const IMAGE_KEYS = new Set([
  'logo',
  'authorPhoto',
  'banner',
  'screenshot',
  'avatar',
  'publicationLogo',
]);

/**
 * For every known image param that is an http(s) URL, fetch the bytes and
 * convert to a base64 data URL. Satori receives raw image data, which avoids:
 *  - WebP / AVIF silent failures
 *  - Next.js image-optimisation URLs that return transformed formats
 *  - Any CORS or redirect issues at render time
 *
 * Non-image params are passed through unchanged. Fetch failures keep the
 * original URL so the renderer can handle the fallback.
 */
export async function resolveImageParams(
  params: Record<string, unknown>,
): Promise<Record<string, unknown>> {
  const entries = Object.entries(params);
  const resolved = await Promise.all(
    entries.map(async ([key, value]) => {
      if (
        !IMAGE_KEYS.has(key) ||
        typeof value !== 'string' ||
        !value.startsWith('http')
      ) {
        return [key, value] as const;
      }
      try {
        const res = await fetch(value, {headers: {Accept: 'image/*'}});
        if (!res.ok) return [key, value] as const;
        const mime = res.headers.get('content-type') ?? 'image/png';
        const buffer = await res.arrayBuffer();
        const b64 = Buffer.from(buffer).toString('base64');
        return [key, `data:${mime};base64,${b64}`] as const;
      } catch {
        return [key, value] as const;
      }
    }),
  );
  return Object.fromEntries(resolved);
}
