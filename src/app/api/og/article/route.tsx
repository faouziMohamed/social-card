import { createOgHandler } from '@/modules/og/server/og-handler.server';
import { articleSchema } from '@/modules/og/shared/og-schemas';
import { articleRenderer } from '@/modules/og/server/renderers/article.renderer';

export const GET = createOgHandler(articleSchema, articleRenderer);
