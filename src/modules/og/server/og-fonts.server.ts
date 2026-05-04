import {readFile} from 'node:fs/promises';
import path from 'node:path';

import {resolveOgFontDefinition} from '@/modules/og/shared/og-font-catalog';
import {type OgFontDefinition} from '@/modules/og/shared/og-font-types';

export {resolveOgFontDefinition} from '@/modules/og/shared/og-font-catalog';

export type OgFontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export interface ParsedGoogleFontSource {
  weight: OgFontWeight;
  style: 'normal' | 'italic';
  url: string;
  format: 'truetype' | 'opentype' | 'woff';
}

export interface ResolvedOgFont {
  name: string;
  data: ArrayBuffer;
  weight: OgFontWeight;
  style: 'normal' | 'italic';
}

export async function resolveOgFonts(
  fontFamily: string,
): Promise<ResolvedOgFont[]> {
  const definition = resolveOgFontDefinition(fontFamily);

  if (definition.source === 'google' && !hasFreshFailure(definition.key)) {
    try {
      const remoteFonts = await loadGoogleFonts(definition);

      if (remoteFonts.length > 0) {
        clearFailure(definition.key);
        return remoteFonts;
      }
    } catch {
      markFailure(definition.key);
    }
  }

  return loadLocalFallbackFonts(definition);
}

export function parseGoogleFontCss(
  css: string,
  requestedWeights: readonly number[],
): ParsedGoogleFontSource[] {
  const requested = new Set(requestedWeights);
  const selected = new Map<string, ParsedGoogleFontSource>();
  const blocks = css.match(/@font-face\s*{[^}]+}/g) ?? [];

  for (const block of blocks) {
    const style = block.match(/font-style:\s*(normal|italic)/)?.[1] as
      | 'normal'
      | 'italic'
      | undefined;
    const weight = Number(block.match(/font-weight:\s*(\d+)/)?.[1]);
    const src = block.match(/src:\s*url\(([^)]+)\)\s*format\('([^']+)'\)/);

    if (
      !style ||
      Number.isNaN(weight) ||
      !isOgFontWeight(weight) ||
      !src ||
      !requested.has(weight)
    ) {
      continue;
    }

    const format = normalizeFontFormat(src[2]);

    if (!format) {
      continue;
    }

    const key = `${style}:${weight}`;

    if (selected.has(key)) {
      continue;
    }

    selected.set(key, {
      style,
      weight,
      url: src[1],
      format,
    });
  }

  return [...selected.values()].toSorted(
    (left, right) =>
      requestedWeights.indexOf(left.weight) -
      requestedWeights.indexOf(right.weight),
  );
}

const FAILURE_TTL_MS = 60_000;
const cssCache = new Map<string, Promise<string>>();
const fontDataCache = new Map<string, Promise<ArrayBuffer>>();
const recentFailures = new Map<string, number>();

async function loadGoogleFonts(
  definition: OgFontDefinition,
): Promise<ResolvedOgFont[]> {
  const css = await getGoogleFontCss(definition);
  const sources = parseGoogleFontCss(css, definition.weights);

  if (sources.length === 0) {
    throw new Error(
      `No supported Google font sources found for ${definition.family}`,
    );
  }

  return Promise.all(
    sources.map(async source => ({
      name: definition.family,
      data: await getFontArrayBuffer(source.url),
      weight: source.weight,
      style: source.style,
    })),
  );
}

async function loadLocalFallbackFonts(
  definition: OgFontDefinition,
): Promise<ResolvedOgFont[]> {
  const primaryFiles = definition.localFiles;

  if (primaryFiles && primaryFiles.length > 0) {
    return Promise.all(
      primaryFiles.map(async file => ({
        name: definition.family,
        data: await readLocalFontFile(file.path),
        weight: toOgFontWeight(file.weight),
        style: file.style ?? 'normal',
      })),
    );
  }

  const fallback = resolveOgFontDefinition(definition.fallbackKey);

  if (!fallback.localFiles || fallback.localFiles.length === 0) {
    throw new Error(
      `No local fallback files configured for ${definition.family}`,
    );
  }

  return Promise.all(
    fallback.localFiles.map(async file => ({
      name: definition.family,
      data: await readLocalFontFile(file.path),
      weight: toOgFontWeight(file.weight),
      style: file.style ?? 'normal',
    })),
  );
}

async function getGoogleFontCss(definition: OgFontDefinition): Promise<string> {
  const url = buildGoogleFontCssUrl(definition);
  const cached = cssCache.get(url);

  if (cached) {
    return cached;
  }

  const request = fetch(url).then(async response => {
    if (!response.ok) {
      throw new Error(
        `Google Fonts CSS request failed for ${definition.family}`,
      );
    }

    return response.text();
  });

  cssCache.set(url, request);
  return request;
}

async function getFontArrayBuffer(url: string): Promise<ArrayBuffer> {
  const cached = fontDataCache.get(url);

  if (cached) {
    return cached;
  }

  const request = fetch(url).then(async response => {
    if (!response.ok) {
      throw new Error(`Font download failed for ${url}`);
    }

    return response.arrayBuffer();
  });

  fontDataCache.set(url, request);
  return request;
}

async function readLocalFontFile(file: string): Promise<ArrayBuffer> {
  const buffer = await readFile(
    path.join(process.cwd(), 'src/assets/fonts', file),
  );
  return buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength,
  );
}

function buildGoogleFontCssUrl(definition: OgFontDefinition): string {
  const family = definition.family.replaceAll(' ', '+');
  const weights = [...new Set(definition.weights)].toSorted(
    (left, right) => left - right,
  );
  const familyQuery = `${family}:wght@${weights.join(';')}`;

  return `https://fonts.googleapis.com/css2?family=${familyQuery}&display=swap`;
}

function clearFailure(key: string): void {
  recentFailures.delete(key);
}

function hasFreshFailure(key: string): boolean {
  const failedAt = recentFailures.get(key);

  return failedAt !== undefined && Date.now() - failedAt < FAILURE_TTL_MS;
}

function markFailure(key: string): void {
  recentFailures.set(key, Date.now());
}

function normalizeFontFormat(
  format: string,
): ParsedGoogleFontSource['format'] | undefined {
  if (format === 'truetype' || format === 'opentype' || format === 'woff') {
    return format;
  }

  return undefined;
}

function isOgFontWeight(value: number): value is OgFontWeight {
  return [100, 200, 300, 400, 500, 600, 700, 800, 900].includes(
    value as OgFontWeight,
  );
}

function toOgFontWeight(value: number): OgFontWeight {
  if (isOgFontWeight(value)) {
    return value;
  }

  throw new Error(`Unsupported font weight: ${value}`);
}
