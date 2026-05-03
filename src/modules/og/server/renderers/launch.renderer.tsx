import React from 'react';
import type {LaunchParams} from '../../shared/og-schemas';
import type {OgRendererContext} from '../og-handler.server';
import {hexToRgba} from '../og-render.server';
import {
  composeBackgroundStyleWithTone,
  resolveTypographyStyle,
} from '../og-visuals.server';

export function launchRenderer(
  p: LaunchParams,
  ctx: OgRendererContext,
): React.ReactElement {
  const {theme} = ctx;
  const accent = p.accentColor;
  const typography = resolveTypographyStyle(p.fontFamily);
  const bgStyle = composeBackgroundStyleWithTone(
    p.bgStyle,
    accent,
    theme.bg,
    p.bgTone,
    p.bgCustomColor,
    p.bgGradientFrom,
    p.bgGradientTo,
  );

  const highlights = [p.highlight1, p.highlight2, p.highlight3].filter(Boolean);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        position: 'relative',
        ...bgStyle,
        paddingLeft: 80,
        paddingRight: 80,
        paddingTop: 64,
        paddingBottom: 64,
        justifyContent: 'space-between',
      }}
    >
      {/* Top: logo + badge */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {p.logo ? (
          <div style={{display: 'flex', borderRadius: 10, overflow: 'hidden'}}>
            <img
              src={p.logo}
              width={52}
              height={52}
              alt=""
              style={{objectFit: 'contain', width: 52, height: 52}}
            />
          </div>
        ) : (
          <div style={{display: 'flex'}} />
        )}
        {p.badge && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: accent,
              borderRadius: 9999,
              paddingLeft: 18,
              paddingRight: 18,
              paddingTop: 8,
              paddingBottom: 8,
            }}
          >
            <span
              style={{
                ...typography,
                fontSize: 16,
                fontWeight: 700,
                color: '#ffffff',
              }}
            >
              {p.badge}
            </span>
          </div>
        )}
      </div>

      {/* Center: product name + punchline */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
        }}
      >
        <span
          style={{
            ...typography,
            fontSize: 82,
            fontWeight: 800,
            color: theme.text,
            textAlign: 'center',
            lineHeight: 1,
            letterSpacing: '-0.03em',
          }}
        >
          {p.productName}
        </span>
        {p.punchline && (
          <span
            style={{
              ...typography,
              fontSize: 26,
              fontWeight: 400,
              color: theme.textMuted,
              textAlign: 'center',
              maxWidth: 720,
            }}
          >
            {p.punchline}
          </span>
        )}
      </div>

      {/* Bottom: highlights row + launch date */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          alignItems: 'center',
        }}
      >
        {highlights.length > 0 && (
          <div style={{display: 'flex', gap: 16}}>
            {highlights.map((h, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  backgroundColor: hexToRgba(accent, 0.12),
                  border: `1px solid ${hexToRgba(accent, 0.3)}`,
                  borderRadius: 12,
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 12,
                  paddingBottom: 12,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    width: 8,
                    height: 8,
                    borderRadius: 9999,
                    backgroundColor: accent,
                  }}
                />
                <span
                  style={{
                    ...typography,
                    fontSize: 18,
                    fontWeight: 600,
                    color: theme.text,
                  }}
                >
                  {h}
                </span>
              </div>
            ))}
          </div>
        )}
        {p.launchDate && (
          <span
            style={{
              ...typography,
              fontSize: 16,
              fontWeight: 500,
              color: hexToRgba(accent, 0.8),
            }}
          >
            {p.launchDate}
          </span>
        )}
      </div>

      {/* Decorative glow */}
      <div
        style={{
          position: 'absolute',
          top: -80,
          right: -80,
          width: 400,
          height: 400,
          borderRadius: 9999,
          backgroundImage: `radial-gradient(circle, ${hexToRgba(accent, 0.12)} 0%, transparent 70%)`,
        }}
      />
    </div>
  );
}
