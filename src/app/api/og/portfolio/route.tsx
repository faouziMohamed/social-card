import { createOgHandler } from '@/modules/og/server/og-handler.server';
import { portfolioSchema } from '@/modules/og/shared/og-schemas';
import { portfolioRenderer } from '@/modules/og/server/renderers/portfolio.renderer';

export const GET = createOgHandler(portfolioSchema, portfolioRenderer);
