import {createSeoTextHandler} from '@/modules/seo/server/seo-text-handler.server';
import {jsonLdSchema} from '@/modules/seo/shared/seo-schemas';
import {buildJsonLdScript} from '@/modules/seo/shared/seo-snippets';

export const GET = createSeoTextHandler(
  jsonLdSchema,
  params => buildJsonLdScript(toStringRecord(params)),
  'application/ld+json; charset=utf-8',
);

function toStringRecord(
  params: Record<string, unknown>,
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(params)
      .filter(([, value]) => typeof value === 'string' && value.length > 0)
      .map(([key, value]) => [key, value as string]),
  );
}
