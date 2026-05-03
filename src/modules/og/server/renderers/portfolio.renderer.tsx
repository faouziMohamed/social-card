import React from 'react';
import type {PortfolioParams} from '../../shared/og-schemas';
import {
  GitHubIcon,
  GlobeIcon,
  MapPinIcon,
  XTwitterIcon,
} from '../og-brand-icons.server';
import type {OgRendererContext} from '../og-handler.server';
import {clampStyle, hexToRgba} from '../og-render.server';
import {
  composeBackgroundStyleWithTone,
  resolveTypographyStyle,
} from '../og-visuals.server';

export function portfolioRenderer(
  p: PortfolioParams,
  ctx: OgRendererContext,
): React.ReactElement {
  const {theme} = ctx;
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

  const skills = p.skills
    ? p.skills
        .split(',')
        .map(s => s.trim())
        .filter(Boolean)
        .slice(0, 6)
    : [];
  type SocialIconComponent = React.ComponentType<{
    size?: number;
    color?: string;
  }>;
  const socialItems: {Icon: SocialIconComponent; text: string}[] = [];
  if (p.githubHandle)
    socialItems.push({Icon: GitHubIcon, text: p.githubHandle});
  if (p.twitterHandle)
    socialItems.push({Icon: XTwitterIcon, text: p.twitterHandle});
  if (p.websiteUrl)
    socialItems.push({Icon: GlobeIcon, text: stripDomain(p.websiteUrl)});
  if (p.location) socialItems.push({Icon: MapPinIcon, text: p.location});

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        paddingTop: 64,
        paddingBottom: 64,
        paddingLeft: 80,
        paddingRight: 80,
        ...bgStyle,
      }}
    >
      <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
        {p.available === 'true' && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: 8,
              marginBottom: 16,
            }}
          >
            <div
              style={{
                display: 'flex',
                width: 12,
                height: 12,
                borderRadius: 9999,
                backgroundColor: '#22c55e',
              }}
            />
            <span
              style={{
                ...typography,
                fontSize: 18,
                fontWeight: 500,
                color: '#22c55e',
              }}
            >
              Open to work
            </span>
          </div>
        )}
        <div style={{display: 'flex', marginBottom: 8}}>
          <span
            style={{
              ...typography,
              fontSize: 68,
              fontWeight: 700,
              color: theme.text,
              lineHeight: 1.1,
              ...clampStyle(1),
            }}
          >
            {p.name}
          </span>
        </div>
        {p.role && (
          <span
            style={{
              ...typography,
              fontSize: 28,
              fontWeight: 500,
              color: accentColor,
              marginBottom: 8,
            }}
          >
            {p.role}
          </span>
        )}
        {p.bio && (
          <span
            style={{
              ...typography,
              fontSize: 22,
              fontWeight: 400,
              color: theme.textMuted,
              lineHeight: 1.5,
              marginBottom: 28,
            }}
          >
            {p.bio}
          </span>
        )}
        {skills.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              columnGap: 8,
              rowGap: 8,
              marginTop: p.bio ? 0 : 28,
            }}
          >
            {skills.map((skill, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  borderRadius: 9999,
                  backgroundColor: hexToRgba(accentColor, 0.15),
                  border: `1px solid ${accentColor}`,
                  paddingTop: 6,
                  paddingBottom: 6,
                  paddingLeft: 14,
                  paddingRight: 14,
                }}
              >
                <span
                  style={{
                    ...typography,
                    fontSize: 18,
                    fontWeight: 400,
                    color: accentColor,
                  }}
                >
                  {skill}
                </span>
              </div>
            ))}
          </div>
        )}
        <div style={{display: 'flex', flex: 1}} />
        {socialItems.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              columnGap: 20,
              rowGap: 8,
            }}
          >
            {socialItems.map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  columnGap: 6,
                }}
              >
                <item.Icon size={18} color={accentColor} />
                <span
                  style={{
                    ...typography,
                    fontSize: 18,
                    fontWeight: 400,
                    color: theme.textMuted,
                  }}
                >
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: 220,
        }}
      >
        {p.avatar && (
          <div
            style={{
              display: 'flex',
              borderRadius: 9999,
              padding: 3,
              backgroundColor: accentColor,
              boxShadow: `0 0 40px ${hexToRgba(accentColor, 0.35)}`,
            }}
          >
            <div
              style={{
                display: 'flex',
                borderRadius: 9999,
                overflow: 'hidden',
                width: 160,
                height: 160,
              }}
            >
              <img
                src={p.avatar}
                width={160}
                height={160}
                alt=""
                style={{objectFit: 'cover', width: 160, height: 160}}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function stripDomain(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
}
