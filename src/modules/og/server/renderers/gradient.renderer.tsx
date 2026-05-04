import type {OgRendererContext} from '@/modules/og/server/og-handler.server';
import {clampStyle, hexToRgba} from '@/modules/og/server/og-render.server';
import {
  composeBackgroundStyleWithTone,
  resolveTypographyStyle,
} from '@/modules/og/server/og-visuals.server';
import type {GradientParams} from '@/modules/og/shared/og-schemas';
import React from 'react';

export function gradientRenderer(
  p: GradientParams,
  ctx: OgRendererContext,
): React.ReactElement {
  const {theme} = ctx;
  const heroText = p.title ?? p.siteName;
  const gradientCss = `linear-gradient(${p.gradientAngle}deg, ${p.gradientFrom}, ${p.gradientTo})`;
  const glowColor = hexToRgba(p.gradientFrom, 0.2);
  const typography = resolveTypographyStyle(p.fontFamily);
  const bgStyle = composeBackgroundStyleWithTone(
    p.bgStyle,
    p.gradientFrom,
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
        position: 'relative',
        ...bgStyle,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(ellipse at 50% 50%, ${glowColor} 0%, transparent 70%)`,
        }}
      />
      {/* Dot mesh */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: 360,
          height: 280,
          backgroundImage: `radial-gradient(circle, ${hexToRgba(p.gradientFrom, 0.05)} 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {p.logo && (
        <div style={{position: 'absolute', top: 60, left: 72, display: 'flex'}}>
          <div
            style={{
              display: 'flex',
              borderRadius: 12,
              overflow: 'hidden',
              width: 80,
              height: 80,
            }}
          >
            <img
              src={p.logo}
              width={80}
              height={80}
              alt=""
              style={{objectFit: 'contain', width: 80, height: 80}}
            />
          </div>
        </div>
      )}

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'center',
          paddingLeft: 72,
          paddingRight: 72,
          paddingTop: p.logo ? 80 : 0,
        }}
      >
        <div style={{display: 'flex', maxWidth: 900, marginBottom: 20}}>
          <span
            style={{
              ...typography,
              fontSize: 80,
              fontWeight: 700,
              backgroundImage: gradientCss,
              backgroundClip: 'text',
              color: 'transparent',
              lineHeight: 1.1,
              ...clampStyle(2),
            }}
          >
            {heroText}
          </span>
        </div>
        <span
          style={{
            ...typography,
            fontSize: 28,
            fontWeight: 500,
            color: theme.textMuted,
            marginBottom: p.description ? 16 : 0,
          }}
        >
          {p.siteName}
        </span>
        {p.description && (
          <div style={{display: 'flex', maxWidth: 800}}>
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
              {p.description}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
