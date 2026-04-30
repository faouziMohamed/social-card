import { createOgHandler } from '@/modules/og/server/og-handler.server';
import { minimalSchema } from '@/modules/og/shared/og-schemas';
import { minimalRenderer } from '@/modules/og/server/renderers/minimal.renderer';

export const GET = createOgHandler(minimalSchema, minimalRenderer);
