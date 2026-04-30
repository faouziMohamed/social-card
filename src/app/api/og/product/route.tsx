import { createOgHandler } from '@/modules/og/server/og-handler.server';
import { productSchema } from '@/modules/og/shared/og-schemas';
import { productRenderer } from '@/modules/og/server/renderers/product.renderer';

export const GET = createOgHandler(productSchema, productRenderer);
