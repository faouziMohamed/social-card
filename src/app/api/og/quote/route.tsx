import {createOgHandler} from '@/modules/og/server/og-handler.server';
import {quoteRenderer} from '@/modules/og/server/renderers/quote.renderer';
import {quoteSchema} from '@/modules/og/shared/og-schemas';

export const GET = createOgHandler(quoteSchema, quoteRenderer);
