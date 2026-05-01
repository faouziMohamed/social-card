import {createOgHandler} from '@/modules/og/server/og-handler.server';
import {productRenderer} from '@/modules/og/server/renderers/product.renderer';
import {productSchema} from '@/modules/og/shared/og-schemas';

export const GET = createOgHandler(productSchema, productRenderer);
