import type {FormSection} from '@/modules/og/shared/og-template-registry';
import type {SeoTemplateName} from '@/modules/seo/shared/seo-schemas';

export const JSON_LD_TEMPLATE_SECTIONS: Record<
  Extract<SeoTemplateName, 'json-ld'>,
  FormSection[]
> = {
  'json-ld': [
    {
      title: 'Preset',
      fields: [
        {
          key: 'schemaType',
          label: 'Schema type',
          type: 'text',
          placeholder: 'Article, Product, FAQPage, Event, JobPosting…',
          options: [
            'Article',
            'Product',
            'FAQPage',
            'Organization',
            'LocalBusiness',
            'SoftwareApplication',
          ],
        },
      ],
    },
    {
      title: 'Core',
      fields: [
        {
          key: 'name',
          label: 'Name',
          type: 'text',
          placeholder: 'Social Card',
        },
        {
          key: 'headline',
          label: 'Headline',
          type: 'text',
          placeholder: 'How to scale your metadata pipeline',
        },
        {
          key: 'description',
          label: 'Description',
          type: 'text',
          placeholder: 'Short summary',
        },
        {
          key: 'url',
          label: 'Canonical URL',
          type: 'url',
          placeholder: 'https://example.com/blog/post',
        },
        {
          key: 'image',
          label: 'Image URL',
          type: 'url',
          placeholder: 'https://example.com/og.png',
        },
      ],
    },
    {
      title: 'People and Publishing',
      fields: [
        {
          key: 'authorName',
          label: 'Author',
          type: 'text',
          placeholder: 'Jane Doe',
        },
        {
          key: 'publisherName',
          label: 'Publisher',
          type: 'text',
          placeholder: 'Acme Inc',
        },
        {key: 'datePublished', label: 'Published', type: 'date'},
        {key: 'dateModified', label: 'Modified', type: 'date'},
      ],
    },
    {
      title: 'Social Profiles',
      fields: [
        {
          key: 'sameAs1',
          label: 'Social URL 1',
          type: 'url',
          placeholder: 'https://x.com/your-brand',
        },
        {
          key: 'sameAs2',
          label: 'Social URL 2',
          type: 'url',
          placeholder: 'https://www.linkedin.com/company/your-brand',
        },
        {
          key: 'sameAs3',
          label: 'Social URL 3',
          type: 'url',
          placeholder: 'https://github.com/your-org',
        },
      ],
    },
    {
      title: 'Commerce and App',
      fields: [
        {
          key: 'price',
          label: 'Price',
          type: 'text',
          placeholder: '49.00',
        },
        {
          key: 'priceCurrency',
          label: 'Currency',
          type: 'text',
          placeholder: 'USD',
        },
        {
          key: 'applicationCategory',
          label: 'App category',
          type: 'text',
          placeholder: 'DeveloperApplication',
        },
        {
          key: 'operatingSystem',
          label: 'Operating system',
          type: 'text',
          placeholder: 'Web',
        },
      ],
    },
    {
      title: 'FAQ',
      fields: [
        {
          key: 'faqQuestion1',
          label: 'Question 1',
          type: 'text',
          placeholder: 'What does this tool do?',
        },
        {
          key: 'faqAnswer1',
          label: 'Answer 1',
          type: 'text',
          placeholder: 'It helps generate OG images and SEO assets.',
        },
        {
          key: 'faqQuestion2',
          label: 'Question 2',
          type: 'text',
          placeholder: 'Can I self-host this?',
        },
        {
          key: 'faqAnswer2',
          label: 'Answer 2',
          type: 'text',
          placeholder: 'Yes, deploy it on your own infrastructure.',
        },
      ],
    },
  ],
};
