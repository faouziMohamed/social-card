import type {TargetKey} from '../hooks/use-builder-state';
import type {ModuleTab} from './builder-island';

export const MODULE_TABS: {value: ModuleTab; label: string}[] = [
  {value: 'og', label: 'OG Images'},
  {value: 'badge', label: 'Badge'},
  {value: 'seo', label: 'SEO'},
];

export const TARGET_OPTIONS: {
  value: TargetKey;
  label: string;
  size: string;
  aspect: string;
}[] = [
  {value: 'og', label: 'OG', size: '1200x630', aspect: '1200/630'},
  {
    value: 'twitter-large',
    label: 'Twitter',
    size: '1200x628',
    aspect: '1200/628',
  },
  {value: 'twitter-small', label: 'Square', size: '800x800', aspect: '800/800'},
  {value: 'linkedin', label: 'LinkedIn', size: '1200x627', aspect: '1200/627'},
];

export const BADGE_ASPECTS: Record<string, string> = {
  label: '130/20',
  stat: '120/48',
  status: '130/24',
  progress: '220/36',
  score: '90/90',
  socials: '200/28',
  'tech-stack': '200/32',
  availability: '200/40',
};

export const SEO_ASPECTS: Record<string, string> = {
  favicon: '1/1',
  'apple-touch-icon': '1/1',
  'manifest-icon': '1/1',
  'twitter-card': '800/418',
};
