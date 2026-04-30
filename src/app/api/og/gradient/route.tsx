import { createOgHandler } from '@/modules/og/server/og-handler.server';
import { gradientSchema } from '@/modules/og/shared/og-schemas';
import { gradientRenderer } from '@/modules/og/server/renderers/gradient.renderer';

export const GET = createOgHandler(gradientSchema, gradientRenderer);
