import {createOgHandler} from '@/modules/og/server/og-handler.server';
import {gradientRenderer} from '@/modules/og/server/renderers/gradient.renderer';
import {gradientSchema} from '@/modules/og/shared/og-schemas';

export const GET = createOgHandler(gradientSchema, gradientRenderer);
