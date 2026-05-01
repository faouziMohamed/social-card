import {createOgHandler} from '@/modules/og/server/og-handler.server';
import {portfolioRenderer} from '@/modules/og/server/renderers/portfolio.renderer';
import {portfolioSchema} from '@/modules/og/shared/og-schemas';

export const GET = createOgHandler(portfolioSchema, portfolioRenderer);
