import {createSeoTextHandler} from '@/modules/seo/server/seo-text-handler.server';
import {metaPackSchema} from '@/modules/seo/shared/seo-schemas';
import {buildMetaPackSnippet} from '@/modules/seo/shared/seo-snippets';

export const GET = createSeoTextHandler(
  metaPackSchema,
  params => buildMetaPackSnippet(toStringRecord(params)),
  'text/plain; charset=utf-8',
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
