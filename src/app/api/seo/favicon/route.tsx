import { createSeoHandler } from '@/modules/seo/server/seo-handler.server';
import { faviconRenderer } from '@/modules/seo/server/renderers/favicon.renderer';
import { faviconSchema } from '@/modules/seo/shared/seo-schemas';

export const GET = createSeoHandler(faviconSchema, faviconRenderer, 32, 32);
