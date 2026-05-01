import {createOgHandler} from '@/modules/og/server/og-handler.server';
import {changelogRenderer} from '@/modules/og/server/renderers/changelog.renderer';
import {changelogSchema} from '@/modules/og/shared/og-schemas';

export const GET = createOgHandler(changelogSchema, changelogRenderer);
