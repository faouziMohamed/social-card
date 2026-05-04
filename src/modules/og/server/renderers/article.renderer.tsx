import type {OgRendererContext} from '@/modules/og/server/og-handler.server';
import {clampStyle, hexToRgba} from '@/modules/og/server/og-render.server';
import {
  composeBackgroundStyleWithTone,
  resolveTypographyStyle,
} from '@/modules/og/server/og-visuals.server';
import type {ArticleParams} from '@/modules/og/shared/og-schemas';
import React from 'react';

function formatDate(iso: string, locale = 'en-US'): string {
  try {
    return new Intl.DateTimeFormat(locale, {dateStyle: 'medium'}).format(
      new Date(iso),
    );
  } catch {
    return iso;
  }
}

export function articleRenderer(
  p: ArticleParams,
  ctx: OgRendererContext,
): React.ReactElement {
  const {theme, height} = ctx;
  const accentColor = p.accentColor;
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
  const formattedDate = p.publishDate
    ? formatDate(p.publishDate, p.dateLocale)
    : null;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        position: 'relative',
        ...bgStyle,
      }}
    >
      {/* Left accent bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 8,
          height,
          backgroundColor: accentColor,
        }}
      />
      {/* Right radial glow */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 500,
          height: '100%',
          backgroundImage: `radial-gradient(ellipse at 100% 50%, ${hexToRgba(accentColor, 0.08)} 0%, transparent 70%)`,
        }}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          paddingTop: 64,
          paddingBottom: 64,
          paddingLeft: 80,
          paddingRight: 80,
        }}
      >
        {p.publicationName && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: 10,
              marginBottom: 32,
            }}
          >
            {p.publicationLogo && (
              <div
                style={{
                  display: 'flex',
                  borderRadius: 8,
                  overflow: 'hidden',
                  width: 40,
                  height: 40,
                }}
              >
                <img
                  src={p.publicationLogo}
                  width={40}
                  height={40}
                  alt=""
                  style={{objectFit: 'contain', width: 40, height: 40}}
                />
              </div>
            )}
            <span
              style={{
                ...typography,
                fontSize: 22,
                fontWeight: 500,
                color: accentColor,
              }}
            >
              {p.publicationName}
            </span>
            {p.publishDate && (
              <span
                style={{
                  ...typography,
                  fontSize: 20,
                  fontWeight: 400,
                  color: theme.textMuted,
                }}
              >
                · {formattedDate}
              </span>
            )}
            {p.readingTime && (
              <span
                style={{
                  ...typography,
                  fontSize: 20,
                  fontWeight: 400,
                  color: theme.textMuted,
                }}
              >
                · {p.readingTime}
              </span>
            )}
          </div>
        )}

        <div style={{display: 'flex', marginBottom: 20}}>
          <span
            style={{
              ...typography,
              fontSize: 58,
              fontWeight: 700,
              color: theme.text,
              lineHeight: 1.15,
              ...clampStyle(3),
            }}
          >
            {p.title}
          </span>
        </div>

        {p.excerpt && (
          <div style={{display: 'flex', marginBottom: 20}}>
            <span
              style={{
                ...typography,
                fontSize: 26,
                fontWeight: 400,
                color: theme.textMuted,
                lineHeight: 1.5,
                ...clampStyle(2),
              }}
            >
              {p.excerpt}
            </span>
          </div>
        )}

        <div style={{display: 'flex', flex: 1}} />

        {p.authorName && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: 16,
            }}
          >
            {p.authorPhoto && (
              <div
                style={{
                  display: 'flex',
                  borderRadius: 9999,
                  padding: 2,
                  backgroundColor: accentColor,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    borderRadius: 9999,
                    overflow: 'hidden',
                    width: 64,
                    height: 64,
                  }}
                >
                  <img
                    src={p.authorPhoto}
                    width={64}
                    height={64}
                    alt=""
                    style={{objectFit: 'cover', width: 64, height: 64}}
                  />
                </div>
              </div>
            )}
            <div style={{display: 'flex', flexDirection: 'column', rowGap: 4}}>
              <span
                style={{
                  ...typography,
                  fontSize: 24,
                  fontWeight: 700,
                  color: theme.text,
                }}
              >
                {p.authorName}
              </span>
              <span
                style={{
                  ...typography,
                  fontSize: 20,
                  fontWeight: 400,
                  color: theme.textMuted,
                }}
              >
                Author
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
