import React from 'react';
import type { EventParams } from '../../shared/og-schemas';
import type { OgRendererContext } from '../og-handler.server';
import { hexToRgba } from '../og-render.server';
import { composeBackgroundStyleWithTone, resolveTypographyStyle } from '../og-visuals.server';

export function eventRenderer(
  p:   EventParams,
  ctx: OgRendererContext,
): React.ReactElement {
  const { theme } = ctx;
  const accent     = p.accentColor;
  const typography = resolveTypographyStyle(p.fontFamily);
  const bgStyle    = composeBackgroundStyleWithTone(
    p.bgStyle,
    accent,
    theme.bg,
    p.bgTone,
    p.bgCustomColor,
    p.bgGradientFrom,
    p.bgGradientTo,
  );

  // Format date
  let formattedDate = p.eventDate ?? '';
  if (p.eventDate) {
    try {
      formattedDate = new Intl.DateTimeFormat(p.dateLocale ?? 'en-US', {
        month: 'long', day: 'numeric', year: 'numeric',
      }).format(new Date(p.eventDate));
    } catch { /* keep raw value */ }
  }

  return (
    <div
      style={{
        display: 'flex', flexDirection: 'column', width: '100%', height: '100%',
        position: 'relative', ...bgStyle,
      }}
    >
      {/* Accent bar top */}
      <div style={{ display: 'flex', width: '100%', height: 6, backgroundColor: accent }} />

      {/* Main content */}
      <div style={{
        display: 'flex', flexDirection: 'column', flex: 1,
        paddingLeft: 80, paddingRight: 80, paddingTop: 56, paddingBottom: 56,
        justifyContent: 'space-between',
      }}>

        {/* Top row: logo + host */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {p.logo ? (
            <div style={{ display: 'flex', borderRadius: 12, overflow: 'hidden' }}>
              <img src={p.logo} width={56} height={56} alt="" style={{ objectFit: 'contain', width: 56, height: 56 }} />
            </div>
          ) : <div style={{ display: 'flex' }} />}
          {p.host && (
            <span style={{ ...typography, fontSize: 18, fontWeight: 500, color: theme.textMuted }}>
              {p.host}
            </span>
          )}
        </div>

        {/* Center: event name + tagline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <span style={{
            ...typography, fontSize: 76, fontWeight: 800, color: theme.text,
            lineHeight: 1.05, letterSpacing: '-0.02em',
          }}>
            {p.eventName}
          </span>
          {p.tagline && (
            <span style={{ ...typography, fontSize: 28, fontWeight: 400, color: theme.textMuted }}>
              {p.tagline}
            </span>
          )}
        </div>

        {/* Bottom row: date pill + location */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {formattedDate && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              backgroundColor: hexToRgba(accent, 0.15),
              borderRadius: 9999, paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10,
              border: `1.5px solid ${hexToRgba(accent, 0.4)}`,
            }}>
              <span style={{ ...typography, fontSize: 18, fontWeight: 600, color: accent }}>
                {formattedDate}
              </span>
            </div>
          )}
          {p.location && (
            <>
              {formattedDate && (
                <div style={{ display: 'flex', width: 4, height: 4, borderRadius: 9999, backgroundColor: hexToRgba(theme.textMuted, 0.5) }} />
              )}
              <span style={{ ...typography, fontSize: 20, fontWeight: 500, color: theme.textMuted }}>
                {p.location}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Accent bar bottom */}
      <div style={{ display: 'flex', width: '100%', height: 3, backgroundColor: hexToRgba(accent, 0.3) }} />
    </div>
  );
}
