// Barrel: re-exports all badge rendering utilities.
// Split from the original 415-line badge-render.server.ts for readability.

export * from '@/modules/badge/server/badge-color.server';
export * from '@/modules/badge/server/badge-constants.server';
export {icon as badgeIcon} from '@/modules/badge/server/badge-icons.server';
export * from '@/modules/badge/server/badge-premium.server';
export {
  circle,
  clipPath,
  escapeXml,
  estimateTextWidth,
  icon,
  line,
  monoText,
  rect,
  svgRoot,
  text,
} from '@/modules/badge/server/badge-svg.server';
