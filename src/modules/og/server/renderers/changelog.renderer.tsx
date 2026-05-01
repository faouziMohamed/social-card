import React from 'react';
import type {ChangelogParams} from '../../shared/og-schemas';
import type {OgRendererContext} from '../og-handler.server';
import {
  composeBackgroundStyleWithTone,
  resolveTypographyStyle,
} from '../og-visuals.server';

export function changelogRenderer(
  p: ChangelogParams,
  ctx: OgRendererContext,
): React.ReactElement {
  const {theme} = ctx;
  const typography = resolveTypographyStyle(p.fontFamily);
  const bgStyle = composeBackgroundStyleWithTone(
    p.bgStyle,
    p.accentColor,
    theme.bg,
    p.bgTone,
    p.bgCustomColor,
    p.bgGradientFrom,
    p.bgGradientTo,
  );
  const items = [p.change1, p.change2, p.change3].filter(Boolean) as string[];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        padding: 64,
        ...bgStyle,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 26,
        }}
      >
        <span
          style={{
            ...typography,
            fontSize: 30,
            fontWeight: 700,
            color: theme.text,
          }}
        >
          {p.productName}
        </span>
        <span
          style={{
            ...typography,
            fontSize: 22,
            fontWeight: 600,
            color: p.accentColor,
          }}
        >
          {p.version}
        </span>
      </div>
      <div
        style={{
          display: 'flex',
          width: 220,
          height: 5,
          borderRadius: 9999,
          backgroundColor: p.accentColor,
          marginBottom: 22,
        }}
      />
      <span
        style={{
          ...typography,
          fontSize: 56,
          fontWeight: 700,
          color: theme.text,
          lineHeight: 1.1,
          marginBottom: 26,
        }}
      >
        {p.headline}
      </span>
      <div style={{display: 'flex', flexDirection: 'column', rowGap: 12}}>
        {items.length > 0 ? (
          items.map((item, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'row',
                columnGap: 12,
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 9999,
                  backgroundColor: p.accentColor,
                }}
              />
              <span
                style={{
                  ...typography,
                  fontSize: 28,
                  fontWeight: 400,
                  color: theme.textMuted,
                }}
              >
                {item}
              </span>
            </div>
          ))
        ) : (
          <span
            style={{
              ...typography,
              fontSize: 24,
              fontWeight: 400,
              color: theme.textMuted,
            }}
          >
            Ship notes ready. Add change1/change2/change3 params.
          </span>
        )}
      </div>
    </div>
  );
}
