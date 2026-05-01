import {createOgHandler} from '@/modules/og/server/og-handler.server';
import {articleRenderer} from '@/modules/og/server/renderers/article.renderer';
import {articleSchema} from '@/modules/og/shared/og-schemas';

export const GET = createOgHandler(articleSchema, articleRenderer);
