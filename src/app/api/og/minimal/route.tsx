import {createOgHandler} from '@/modules/og/server/og-handler.server';
import {minimalRenderer} from '@/modules/og/server/renderers/minimal.renderer';
import {minimalSchema} from '@/modules/og/shared/og-schemas';

export const GET = createOgHandler(minimalSchema, minimalRenderer);
