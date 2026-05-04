import type {TemplateName} from './og.types';

export interface TemplateMeta {
  name: TemplateName;
  label: string;
  desc: string;
  color: string;
  icon: string;
}

export const TEMPLATE_META: TemplateMeta[] = [
  {
    name: 'general',
    label: 'General',
    desc: 'Logo + title + description',
    color: '#6366f1',
    icon: '⬡',
  },
  {
    name: 'gradient',
    label: 'Gradient',
    desc: 'Vivid gradient headline',
    color: '#22d3ee',
    icon: '◈',
  },
  {
    name: 'blog',
    label: 'Blog',
    desc: 'Two-column with banner',
    color: '#f472b6',
    icon: '▤',
  },
  {
    name: 'minimal',
    label: 'Minimal',
    desc: 'Clean centered typography',
    color: '#94a3b8',
    icon: '▢',
  },
  {
    name: 'article',
    label: 'Article',
    desc: 'Editorial long-form layout',
    color: '#f59e0b',
    icon: '▥',
  },
  {
    name: 'product',
    label: 'Product',
    desc: 'Features + screenshot',
    color: '#a855f7',
    icon: '◉',
  },
  {
    name: 'portfolio',
    label: 'Portfolio',
    desc: 'Avatar + skills showcase',
    color: '#3b82f6',
    icon: '◎',
  },
  {
    name: 'quote',
    label: 'Quote',
    desc: 'Bold quote card',
    color: '#14b8a6',
    icon: '❝',
  },
  {
    name: 'changelog',
    label: 'Changelog',
    desc: 'Release notes card',
    color: '#38bdf8',
    icon: '☰',
  },
  {
    name: 'event',
    label: 'Event',
    desc: 'Conference / meetup card',
    color: '#f97316',
    icon: '◷',
  },
  {
    name: 'launch',
    label: 'Launch',
    desc: 'Product launch announcement',
    color: '#ec4899',
    icon: '◈',
  },
];

export interface SelectOption {
  value: string;
  label: string;
}

export type FieldDef =
  | {
      key: string;
      label: string;
      type: 'text' | 'url';
      placeholder?: string;
      options?: (string | SelectOption)[];
    }
  | {key: string; label: string; type: 'color'}
  | {
      key: string;
      label: string;
      type: 'select';
      options: (string | SelectOption)[];
    }
  | {
      key: string;
      label: string;
      type: 'multi-select';
      options: (string | SelectOption)[];
    }
  | {key: string; label: string; type: 'date'};

export interface FormSection {
  title: string;
  fields: FieldDef[];
}

export {SHARED_MEDIA, SHARED_STYLE} from './og-shared-sections';
export {DEMO_PARAMS, EXAMPLE_PARAMS} from './og-template-examples';
export {TEMPLATE_SECTIONS} from './og-template-sections';
