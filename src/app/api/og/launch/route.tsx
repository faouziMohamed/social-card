import {createOgHandler} from '@/modules/og/server/og-handler.server';
import {launchRenderer} from '@/modules/og/server/renderers/launch.renderer';
import {launchSchema} from '@/modules/og/shared/og-schemas';

export const GET = createOgHandler(launchSchema, launchRenderer);
