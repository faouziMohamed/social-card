import { createOgHandler } from '@/modules/og/server/og-handler.server';
import { blogSchema } from '@/modules/og/shared/og-schemas';
import { blogRenderer } from '@/modules/og/server/renderers/blog.renderer';

export const GET = createOgHandler(blogSchema, blogRenderer);
