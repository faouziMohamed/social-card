import {createOgHandler} from '@/modules/og/server/og-handler.server';
import {eventRenderer} from '@/modules/og/server/renderers/event.renderer';
import {eventSchema} from '@/modules/og/shared/og-schemas';

export const GET = createOgHandler(eventSchema, eventRenderer);
