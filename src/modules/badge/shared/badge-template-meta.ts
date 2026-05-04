import type {BadgeName} from '@/modules/badge/shared/badge-schemas';

export interface BadgeTemplateMeta {
  name: BadgeName;
  label: string;
  desc: string;
  color: string;
  icon: string;
}

export const TEMPLATE_META: BadgeTemplateMeta[] = [
  {
    name: 'label',
    label: 'Label',
    desc: 'Premium two-segment badge',
    color: '#6366f1',
    icon: '▤',
  },
  {
    name: 'stat',
    label: 'Stat',
    desc: 'Single metric with big number',
    color: '#22d3ee',
    icon: '◉',
  },
  {
    name: 'status',
    label: 'Status',
    desc: 'Service health indicator',
    color: '#22c55e',
    icon: '●',
  },
  {
    name: 'progress',
    label: 'Progress',
    desc: 'Horizontal progress bar',
    color: '#f59e0b',
    icon: '▬',
  },
  {
    name: 'score',
    label: 'Score',
    desc: 'Circular score ring',
    color: '#a855f7',
    icon: '◎',
  },
  {
    name: 'socials',
    label: 'Socials',
    desc: 'Platform follower count',
    color: '#3b82f6',
    icon: '◈',
  },
  {
    name: 'tech-stack',
    label: 'Tech Stack',
    desc: 'Technology pill chips',
    color: '#14b8a6',
    icon: '⬡',
  },
  {
    name: 'availability',
    label: 'Availability',
    desc: 'Open-to-Work status card',
    color: '#f472b6',
    icon: '◷',
  },
];
