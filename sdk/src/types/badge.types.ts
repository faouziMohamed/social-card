// Badge Types

export type BadgeName =
  | 'label'
  | 'stat'
  | 'status'
  | 'progress'
  | 'score'
  | 'socials'
  | 'tech-stack'
  | 'availability';

export interface BadgeBaseParams {
  theme?: 'dark' | 'light';
}

export interface LabelParams extends BadgeBaseParams {
  label?: string;
  message?: string;
  color?: string;
  labelColor?: string;
  style?: 'flat' | 'pill';
}

export interface StatParams extends BadgeBaseParams {
  label?: string;
  value?: string;
  unit?: string;
  color?: string;
  icon?:
    | 'star'
    | 'download'
    | 'eye'
    | 'fork'
    | 'heart'
    | 'zap'
    | 'check'
    | 'clock';
}

export interface StatusParams extends BadgeBaseParams {
  label?: string;
  status?: 'online' | 'offline' | 'degraded' | 'maintenance';
  color?: string;
}

export interface ProgressParams extends BadgeBaseParams {
  label?: string;
  value?: number;
  color?: string;
  width?: number;
}

export interface ScoreParams extends BadgeBaseParams {
  label?: string;
  value?: number;
  max?: number;
  color?: string;
}

export interface SocialsParams extends BadgeBaseParams {
  platform?:
    | 'github'
    | 'x'
    | 'bluesky'
    | 'linkedin'
    | 'youtube'
    | 'twitch'
    | 'discord'
    | 'npm'
    | 'pypi';
  handle?: string;
  followers?: string;
  color?: string;
}

export interface TechStackParams extends BadgeBaseParams {
  stack?: string;
  color?: string;
  style?: 'tags' | 'row';
}

export interface AvailabilityParams extends BadgeBaseParams {
  label?: string;
  available?: 'true' | 'false';
  hireText?: string;
  color?: string;
}
