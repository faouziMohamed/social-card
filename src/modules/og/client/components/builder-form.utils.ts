import type {
  FieldDef,
  FormSection,
} from '@/modules/og/shared/og-template-registry';

export function computeFullWidthSet(fields: FieldDef[]): Set<string> {
  const result = new Set<string>();
  let col = 0;

  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];
    if (isFullWidth(field) || isBgOverlays(field)) {
      col = 0;
      continue;
    }
    if (col === 0) {
      const immediateNext = fields[i + 1];
      const partnerExists =
        immediateNext &&
        !isFullWidth(immediateNext) &&
        !isBgOverlays(immediateNext);
      if (partnerExists) {
        col = 1;
      } else {
        result.add(field.key);
        col = 0;
      }
    } else {
      col = 0;
    }
  }

  return result;
}

export function getChangelogEntries(params: Record<string, string>) {
  const values = Object.entries(params)
    .map(([key, value]) => {
      const match = key.match(/^change(\d+)$/);
      if (!match) return null;
      return {
        index: Number(match[1]),
        value: value ?? '',
      };
    })
    .filter(item => item !== null)
    .toSorted((a, b) => a.index - b.index);

  const nonEmpty = values.filter(entry => entry.value.trim().length > 0);
  if (nonEmpty.length > 0) return values;

  return [{index: 1, value: params.change1 ?? ''}];
}

export function getFaqEntries(params: Record<string, string>) {
  const indices = new Set<number>();
  for (const key of Object.keys(params)) {
    const questionMatch = key.match(/^faqQuestion(\d+)$/);
    if (questionMatch) indices.add(Number(questionMatch[1]));
    const answerMatch = key.match(/^faqAnswer(\d+)$/);
    if (answerMatch) indices.add(Number(answerMatch[1]));
  }

  if (indices.size === 0) {
    indices.add(1);
    indices.add(2);
  }

  return [...indices]
    .filter(index => Number.isFinite(index) && index > 0)
    .toSorted((a, b) => a - b)
    .map(index => ({
      index,
      question: params[`faqQuestion${index}`] ?? '',
      answer: params[`faqAnswer${index}`] ?? '',
    }));
}

export function isChangelogReleaseSection(
  section: FormSection,
  params: Record<string, string>,
): boolean {
  if (section.title !== 'Release') return false;
  const hasChangeField = section.fields.some(field =>
    isChangelogChangeField(field.key),
  );
  return (
    hasChangeField || Object.keys(params).some(key => /^change\d+$/.test(key))
  );
}

export function isChangelogChangeField(key: string): boolean {
  return /^change\d+$/.test(key);
}

export function normalizeJsonLdSchemaType(value?: string): string {
  return (value ?? 'Article').trim().toLowerCase();
}

export function parseBgStyle(value: string): {
  base: string;
  overlays: string[];
} {
  const tokens = value
    .split('+')
    .map(v => v.trim())
    .filter(Boolean);
  const bases = new Set(['solid', 'gradient', 'aurora', 'mesh']);
  const overlaySet = new Set([
    'grid',
    'dots',
    'diagonal',
    'noise',
    'spotlight',
    'vignette',
  ]);
  const base = tokens.find(t => bases.has(t)) ?? 'gradient';
  return {base, overlays: tokens.filter(t => overlaySet.has(t))};
}

export function serializeBgStyle(base: string, overlays: string[]): string {
  return [base, ...overlays].join('+');
}

export function shouldShowJsonLdField(
  key: string,
  schemaType: string,
  params: Record<string, string>,
): boolean {
  const jsonLdFieldKeys = new Set([
    'schemaType',
    'name',
    'headline',
    'description',
    'url',
    'image',
    'authorName',
    'publisherName',
    'datePublished',
    'dateModified',
    'price',
    'priceCurrency',
    'applicationCategory',
    'operatingSystem',
    'faqQuestion1',
    'faqAnswer1',
    'faqQuestion2',
    'faqAnswer2',
    'sameAs1',
    'sameAs2',
    'sameAs3',
    'jsonRaw',
  ]);
  if (!jsonLdFieldKeys.has(key)) return true;

  const resolvedSchemaType =
    !params.schemaType && key !== 'schemaType' ? 'article' : schemaType;

  const always = new Set([
    'schemaType',
    'name',
    'description',
    'url',
    'image',
    'jsonRaw',
  ]);
  if (always.has(key)) return true;

  if (resolvedSchemaType === 'article') {
    return (
      key === 'headline' ||
      key === 'authorName' ||
      key === 'publisherName' ||
      key === 'datePublished' ||
      key === 'dateModified'
    );
  }

  if (resolvedSchemaType === 'product') {
    return key === 'price' || key === 'priceCurrency';
  }

  if (resolvedSchemaType === 'faqpage') {
    return (
      key === 'faqQuestion1' ||
      key === 'faqAnswer1' ||
      key === 'faqQuestion2' ||
      key === 'faqAnswer2'
    );
  }

  if (
    resolvedSchemaType === 'organization' ||
    resolvedSchemaType === 'localbusiness'
  ) {
    return key === 'sameAs1' || key === 'sameAs2' || key === 'sameAs3';
  }

  if (resolvedSchemaType === 'softwareapplication') {
    return (
      key === 'applicationCategory' ||
      key === 'operatingSystem' ||
      key === 'price' ||
      key === 'priceCurrency'
    );
  }

  return false;
}

function isFullWidth(field: FieldDef): boolean {
  return (
    field.type === 'color' ||
    field.type === 'date' ||
    field.type === 'multi-select'
  );
}

function isBgOverlays(field: FieldDef): boolean {
  return field.key === 'bgOverlays';
}
