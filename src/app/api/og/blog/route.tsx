import {createOgHandler} from '@/modules/og/server/og-handler.server';
import {blogRenderer} from '@/modules/og/server/renderers/blog.renderer';
import {blogSchema} from '@/modules/og/shared/og-schemas';

export const GET = createOgHandler(blogSchema, blogRenderer);
