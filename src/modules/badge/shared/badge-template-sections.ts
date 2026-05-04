import type {FormSection} from '@/modules/og/shared/og-template-registry';
import type {BadgeName} from './badge-schemas';

const SHARED_THEME: FormSection = {
  title: 'Theme',
  fields: [
    {key: 'theme', label: 'Theme', type: 'select', options: ['dark', 'light']},
  ],
};

export const TEMPLATE_SECTIONS: Record<BadgeName, FormSection[]> = {
  label: [
    {
      title: 'Content',
      fields: [
        {key: 'label', label: 'Label', type: 'text', placeholder: 'version'},
        {key: 'message', label: 'Message', type: 'text', placeholder: '1.0.0'},
      ],
    },
    {
      title: 'Style',
      fields: [
        {key: 'color', label: 'Message color', type: 'color'},
        {key: 'labelColor', label: 'Label color', type: 'color'},
        {
          key: 'style',
          label: 'Style',
          type: 'select',
          options: ['flat', 'pill'],
        },
      ],
    },
    SHARED_THEME,
  ],
  stat: [
    {
      title: 'Content',
      fields: [
        {key: 'label', label: 'Label', type: 'text', placeholder: 'Stars'},
        {key: 'value', label: 'Value', type: 'text', placeholder: '1.2k'},
        {key: 'unit', label: 'Unit', type: 'text', placeholder: '%'},
        {
          key: 'icon',
          label: 'Icon',
          type: 'select',
          options: [
            {value: '__none__', label: 'None'},
            'star',
            'download',
            'eye',
            'fork',
            'heart',
            'zap',
            'check',
            'clock',
          ],
        },
      ],
    },
    {
      title: 'Style',
      fields: [{key: 'color', label: 'Accent color', type: 'color'}],
    },
    SHARED_THEME,
  ],
  status: [
    {
      title: 'Content',
      fields: [
        {key: 'label', label: 'Label', type: 'text', placeholder: 'API'},
        {
          key: 'status',
          label: 'Status',
          type: 'select',
          options: ['online', 'offline', 'degraded', 'maintenance'],
        },
      ],
    },
    {
      title: 'Style',
      fields: [{key: 'color', label: 'Override color', type: 'color'}],
    },
    SHARED_THEME,
  ],
  progress: [
    {
      title: 'Content',
      fields: [
        {key: 'label', label: 'Label', type: 'text', placeholder: 'Coverage'},
        {key: 'value', label: 'Value (0-100)', type: 'text', placeholder: '75'},
        {key: 'width', label: 'Width (px)', type: 'text', placeholder: '220'},
      ],
    },
    {
      title: 'Style',
      fields: [{key: 'color', label: 'Bar color', type: 'color'}],
    },
    SHARED_THEME,
  ],
  score: [
    {
      title: 'Content',
      fields: [
        {
          key: 'label',
          label: 'Label',
          type: 'text',
          placeholder: 'Performance',
        },
        {key: 'value', label: 'Score', type: 'text', placeholder: '95'},
        {key: 'max', label: 'Max', type: 'text', placeholder: '100'},
      ],
    },
    {
      title: 'Style',
      fields: [{key: 'color', label: 'Ring color', type: 'color'}],
    },
    SHARED_THEME,
  ],
  socials: [
    {
      title: 'Content',
      fields: [
        {
          key: 'platform',
          label: 'Platform',
          type: 'select',
          options: [
            'github',
            'x',
            'bluesky',
            'linkedin',
            'youtube',
            'twitch',
            'discord',
            'npm',
            'pypi',
          ],
        },
        {key: 'handle', label: 'Handle', type: 'text', placeholder: 'acme'},
        {
          key: 'followers',
          label: 'Followers',
          type: 'text',
          placeholder: '4.2k',
        },
      ],
    },
    {
      title: 'Style',
      fields: [{key: 'color', label: 'Accent color', type: 'color'}],
    },
    SHARED_THEME,
  ],
  'tech-stack': [
    {
      title: 'Content',
      fields: [
        {
          key: 'stack',
          label: 'Stack',
          type: 'text',
          placeholder: 'React,TypeScript,Go',
        },
      ],
    },
    {
      title: 'Style',
      fields: [
        {key: 'color', label: 'Tag color', type: 'color'},
        {
          key: 'style',
          label: 'Layout',
          type: 'select',
          options: ['tags', 'row'],
        },
      ],
    },
    SHARED_THEME,
  ],
  availability: [
    {
      title: 'Content',
      fields: [
        {
          key: 'label',
          label: 'Name / Role',
          type: 'text',
          placeholder: 'Mohamed Faouzi',
        },
        {
          key: 'available',
          label: 'Available',
          type: 'select',
          options: ['true', 'false'],
        },
        {
          key: 'hireText',
          label: 'CTA text',
          type: 'text',
          placeholder: 'Available for freelance',
        },
      ],
    },
    {
      title: 'Style',
      fields: [{key: 'color', label: 'Accent color', type: 'color'}],
    },
    SHARED_THEME,
  ],
};
