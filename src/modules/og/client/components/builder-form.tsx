'use client';

import {
  ChangelogFieldList,
  FaqFieldList,
} from '@/modules/og/client/components/builder-form-dynamic-lists';
import {FieldCell} from '@/modules/og/client/components/builder-form-field-cell';
import {
  computeFullWidthSet,
  isChangelogChangeField,
  isChangelogReleaseSection,
  normalizeJsonLdSchemaType,
  parseBgStyle,
  shouldShowJsonLdField,
} from '@/modules/og/client/components/builder-form.utils';
import type {FormSection} from '@/modules/og/shared/og-template-registry';

export interface BuilderFormProps {
  sections: FormSection[];
  params: Record<string, string>;
  onParamChange: (key: string, value: string) => void;
  onParamDelete?: (key: string) => void;
}

export function BuilderForm({
  sections,
  params,
  onParamChange,
  onParamDelete,
}: BuilderFormProps) {
  const schemaType = normalizeJsonLdSchemaType(params.schemaType);

  return (
    <div className="flex flex-col divide-y divide-border/20">
      {sections.map(section => {
        if (isChangelogReleaseSection(section, params)) {
          return (
            <div key={section.title}>
              <SectionHeader title={section.title} />
              <div className="grid grid-cols-2 gap-x-3 gap-y-3 px-4 py-3">
                {section.fields
                  .filter(field => !isChangelogChangeField(field.key))
                  .map(field => (
                    <FieldCell
                      key={field.key}
                      field={field}
                      params={params}
                      forceFullWidth={false}
                      onChange={val => onParamChange(field.key, val)}
                      onParamChange={onParamChange}
                    />
                  ))}
                <div className="col-span-2">
                  <ChangelogFieldList
                    params={params}
                    onParamChange={onParamChange}
                  />
                </div>
              </div>
            </div>
          );
        }

        if (section.title === 'FAQ' && schemaType === 'faqpage') {
          return (
            <div key={section.title}>
              <SectionHeader title={section.title} />
              <div className="px-4 py-3">
                <FaqFieldList
                  params={params}
                  onParamChange={onParamChange}
                  onParamDelete={onParamDelete}
                />
              </div>
            </div>
          );
        }

        const visibleFields = section.fields.filter(f => {
          if (!shouldShowJsonLdField(f.key, schemaType, params)) return false;
          if (f.key === 'bgCustomColor' && params.bgTone !== 'custom')
            return false;
          const {base} = parseBgStyle(params.bgStyle ?? 'gradient+grid');
          if (
            (f.key === 'bgGradientFrom' || f.key === 'bgGradientTo') &&
            base !== 'gradient'
          ) {
            return false;
          }
          return true;
        });

        if (visibleFields.length === 0) return null;

        const forceFullWidth = computeFullWidthSet(visibleFields);

        return (
          <div key={section.title}>
            <SectionHeader title={section.title} />
            <div className="grid grid-cols-2 gap-x-3 gap-y-3 px-4 py-3">
              {visibleFields.map(field => (
                <FieldCell
                  key={field.key}
                  field={field}
                  params={params}
                  forceFullWidth={forceFullWidth.has(field.key)}
                  onChange={val => onParamChange(field.key, val)}
                  onParamChange={onParamChange}
                />
              ))}
            </div>
          </div>
        );
      })}

      <div className="h-2" />
    </div>
  );
}

function SectionHeader({title}: {title: string}) {
  return (
    <div className="sticky top-0 z-10 border-b border-border/20 bg-card/90 px-4 py-2 backdrop-blur-sm">
      <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-muted-fg/40">
        {title}
      </span>
    </div>
  );
}
