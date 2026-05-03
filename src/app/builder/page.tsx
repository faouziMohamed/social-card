import {ROUTES} from '@/lib/utils/routes';
import {redirect} from 'next/navigation';

export default function BuilderIndexPage() {
  redirect(ROUTES.builderTabs.og);
}
