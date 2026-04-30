import { createSeoHandler } from '@/modules/seo/server/seo-handler.server';
import { appleTouchIconRenderer } from '@/modules/seo/server/renderers/apple-touch-icon.renderer';
import { appleTouchIconSchema } from '@/modules/seo/shared/seo-schemas';

export const GET = createSeoHandler(appleTouchIconSchema, appleTouchIconRenderer, 180, 180);
