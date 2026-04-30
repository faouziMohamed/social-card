import { createSeoHandler } from '@/modules/seo/server/seo-handler.server';
import { twitterCardRenderer } from '@/modules/seo/server/renderers/twitter-card.renderer';
import { twitterCardSchema } from '@/modules/seo/shared/seo-schemas';

export const GET = createSeoHandler(twitterCardSchema, twitterCardRenderer, 800, 418);
