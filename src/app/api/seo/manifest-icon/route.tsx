import {manifestIconRenderer} from '@/modules/seo/server/renderers/manifest-icon.renderer';
import {createSeoHandler} from '@/modules/seo/server/seo-handler.server';
import {manifestIconSchema} from '@/modules/seo/shared/seo-schemas';

// Size is driven by the `size` query param (192 or 512). We render at 512 and
// let the `size` param control which dimension ImageResponse uses.
export async function GET(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const size = url.searchParams.get('size') === '192' ? 192 : 512;
  const handler = createSeoHandler(
    manifestIconSchema,
    manifestIconRenderer,
    size,
    size,
  );
  return handler(req as never);
}
