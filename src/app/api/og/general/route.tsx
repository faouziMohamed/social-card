import {createOgHandler} from '@/modules/og/server/og-handler.server';
import {generalRenderer} from '@/modules/og/server/renderers/general.renderer';
import {generalSchema} from '@/modules/og/shared/og-schemas';

export const GET = createOgHandler(generalSchema, generalRenderer);
