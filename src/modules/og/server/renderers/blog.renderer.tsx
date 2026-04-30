import React from 'react';
import type { BlogParams } from '../../shared/og-schemas';
import type { OgRendererContext } from '../og-handler.server';
import { clampStyle } from '../og-render.server';
import { composeBackgroundStyleWithTone, resolveTypographyStyle } from '../og-visuals.server';

function formatDate(iso: string, locale = 'en-US'): string {
  try { return new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(new Date(iso)); }
  catch { return iso; }
}

export function blogRenderer(
  p:   BlogParams,
  ctx: OgRendererContext,
): React.ReactElement {
  const { theme, width, height } = ctx;
  const accentColor    = p.accentColor ?? '#6366f1';
  const typography = resolveTypographyStyle(p.fontFamily);
  const bgStyle = composeBackgroundStyleWithTone(
    p.bgStyle,
    accentColor,
    theme.bg,
    p.bgTone,
    p.bgCustomColor,
    p.bgGradientFrom,
    p.bgGradientTo,
  );
  const hasBanner      = !!p.banner;
  const leftWidth      = hasBanner ? Math.round(width * 0.58) : width;
  const rightWidth     = hasBanner ? width - leftWidth : 0;
  const tags           = p.tags ? p.tags.split(',').map((t) => t.trim()).filter(Boolean).slice(0, 4) : [];
  const formattedDate  = p.publishDate ? formatDate(p.publishDate, p.dateLocale) : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%', ...bgStyle }}>
      {/* Left column */}
      <div style={{ display: 'flex', flexDirection: 'column', width: leftWidth, height: '100%', paddingTop: 56, paddingBottom: 56, paddingLeft: 64, paddingRight: hasBanner ? 40 : 64 }}>
        {(p.siteDomain || formattedDate) && (
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', columnGap: 12, marginBottom: 12 }}>
            {p.siteDomain && <span style={{ ...typography, fontSize: 20, fontWeight: 400, color: theme.textMuted }}>{p.siteDomain}</span>}
            {p.siteDomain && formattedDate && <span style={{ ...typography, fontSize: 20, color: theme.textMuted }}>·</span>}
            {formattedDate && <span style={{ ...typography, fontSize: 20, fontWeight: 400, color: theme.textMuted }}>{formattedDate}</span>}
          </div>
        )}
        <div style={{ display: 'flex', width: '100%', height: 4, backgroundColor: accentColor, marginBottom: 20 }} />
        <div style={{ display: 'flex', marginBottom: 20 }}>
          <span style={{ ...typography, fontSize: 48, fontWeight: 700, color: theme.text, lineHeight: 1.15, ...clampStyle(3) }}>
            {p.title}
          </span>
        </div>
        {(tags.length > 0 || p.readingTime) && (
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', columnGap: 8, rowGap: 8, marginBottom: 16 }}>
            {tags.map((tag, i) => (
              <div key={i} style={{ display: 'flex', borderRadius: 9999, backgroundColor: theme.tagBg, paddingTop: 6, paddingBottom: 6, paddingLeft: 14, paddingRight: 14 }}>
                <span style={{ ...typography, fontSize: 18, fontWeight: 500, color: theme.tagText }}>{tag}</span>
              </div>
            ))}
            {p.readingTime && <span style={{ ...typography, fontSize: 18, fontWeight: 400, color: theme.textMuted }}>· {p.readingTime}</span>}
          </div>
        )}
        <div style={{ display: 'flex', flex: 1 }} />
        {p.authorName && (
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', columnGap: 16 }}>
            {p.authorPhoto && (
              <div style={{ display: 'flex', borderRadius: 9999, overflow: 'hidden', width: 72, height: 72, border: `2px solid ${accentColor}` }}>
                <img src={p.authorPhoto} width={72} height={72} alt="" style={{ objectFit: 'cover', width: 72, height: 72 }} />
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', rowGap: 4 }}>
              <span style={{ ...typography, fontSize: 22, fontWeight: 700, color: theme.text }}>{p.authorName}</span>
              {p.authorHandle && <span style={{ ...typography, fontSize: 20, fontWeight: 400, color: theme.textMuted }}>{p.authorHandle}</span>}
            </div>
          </div>
        )}
      </div>

      {/* Right banner column */}
      {hasBanner && (
        <div style={{ display: 'flex', width: rightWidth, height: '100%', position: 'relative', overflow: 'hidden' }}>
          <img src={p.banner} width={rightWidth} height={height} alt="" style={{ objectFit: 'cover', width: rightWidth, height: '100%' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, width: 180, height: '100%', backgroundImage: `linear-gradient(to right, ${theme.bg}, transparent)` }} />
        </div>
      )}
    </div>
  );
}
