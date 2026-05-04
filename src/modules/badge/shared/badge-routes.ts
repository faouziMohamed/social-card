import type {BadgeName} from '@/modules/badge/shared/badge-schemas';

export const BADGE_ROUTES: Record<BadgeName, string> = {
  label: '/api/badge/label',
  stat: '/api/badge/stat',
  status: '/api/badge/status',
  progress: '/api/badge/progress',
  score: '/api/badge/score',
  socials: '/api/badge/socials',
  'tech-stack': '/api/badge/tech-stack',
  availability: '/api/badge/availability',
};
