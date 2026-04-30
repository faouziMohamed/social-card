import { createOgHandler } from '@/modules/og/server/og-handler.server';
import { generalSchema } from '@/modules/og/shared/og-schemas';
import { generalRenderer } from '@/modules/og/server/renderers/general.renderer';

export const GET = createOgHandler(generalSchema, generalRenderer);
