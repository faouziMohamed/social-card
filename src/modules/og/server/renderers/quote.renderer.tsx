import React from 'react';
import type {QuoteParams} from '../../shared/og-schemas';
import type {OgRendererContext} from '../og-handler.server';
import {clampStyle} from '../og-render.server';
import {
  composeBackgroundStyleWithTone,
  resolveTypographyStyle,
} from '../og-visuals.server';

export function quoteRenderer(
  p: QuoteParams,
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

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        padding: 72,
        ...bgStyle,
      }}
    >
      {p.kicker && (
        <span
          style={{
            ...typography,
            fontSize: 20,
            fontWeight: 600,
            color: p.accentColor,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: 18,
          }}
        >
          {p.kicker}
        </span>
      )}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'stretch',
          gap: 24,
        }}
      >
        <div
          style={{width: 8, borderRadius: 9999, backgroundColor: p.accentColor}}
        />
        <span
          style={{
            ...typography,
            fontSize: 66,
            fontWeight: 700,
            lineHeight: 1.18,
            color: theme.text,
            ...clampStyle(4),
          }}
        >
          {p.quote}
        </span>
      </div>
      <div style={{display: 'flex', flex: 1}} />
      {p.author && (
        <span
          style={{
            ...typography,
            fontSize: 28,
            fontWeight: 500,
            color: p.accentColor,
          }}
        >
          — {p.author}
        </span>
      )}
    </div>
  );
}
