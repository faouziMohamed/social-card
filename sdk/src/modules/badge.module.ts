import {SocialCardClient} from '../client';
import {
  AvailabilityParams,
  BadgeName,
  LabelParams,
  ProgressParams,
  ScoreParams,
  SocialsParams,
  StatParams,
  StatusParams,
  TechStackParams,
} from '../types/badge.types';
import {hexColorValidator, stringValidator, validate} from '../validator';

const base: Record<string, (v: unknown, f: string) => unknown> = {
  color: hexColorValidator(true),
};

const labelValidators: Record<string, (v: unknown, f: string) => unknown> = {
  ...base,
  label: stringValidator(true),
  message: stringValidator(true),
  labelColor: hexColorValidator(true),
};

/**
 * Module for generating SVG badges.
 * Supports all 8 badge types via URL builder and SVG fetch methods.
 */
export class BadgeModule {
  constructor(private client: SocialCardClient) {}

  // ── URL builders ────────────────────────────────────────────────────────

  label(p: LabelParams): string {
    return this.badgeUrl('label', p, labelValidators);
  }
  stat(p: StatParams): string {
    return this.badgeUrl('stat', p);
  }
  status(p: StatusParams): string {
    return this.badgeUrl('status', p);
  }
  progress(p: ProgressParams): string {
    return this.badgeUrl('progress', p);
  }
  score(p: ScoreParams): string {
    return this.badgeUrl('score', p);
  }
  socials(p: SocialsParams): string {
    return this.badgeUrl('socials', p);
  }
  techStack(p: TechStackParams): string {
    return this.badgeUrl('tech-stack', p);
  }
  availability(p: AvailabilityParams): string {
    return this.badgeUrl('availability', p);
  }

  // ── SVG fetchers ─────────────────────────────────────────────────────────

  async labelSvg(p: LabelParams): Promise<string> {
    return this.badgeSvg('label', p, labelValidators);
  }
  async statSvg(p: StatParams): Promise<string> {
    return this.badgeSvg('stat', p);
  }
  async statusSvg(p: StatusParams): Promise<string> {
    return this.badgeSvg('status', p);
  }
  async progressSvg(p: ProgressParams): Promise<string> {
    return this.badgeSvg('progress', p);
  }
  async scoreSvg(p: ScoreParams): Promise<string> {
    return this.badgeSvg('score', p);
  }
  async socialsSvg(p: SocialsParams): Promise<string> {
    return this.badgeSvg('socials', p);
  }
  async techStackSvg(p: TechStackParams): Promise<string> {
    return this.badgeSvg('tech-stack', p);
  }
  async availabilitySvg(p: AvailabilityParams): Promise<string> {
    return this.badgeSvg('availability', p);
  }

  // ── Private helpers ───────────────────────────────────────────────────────

  private badgeUrl<T>(t: BadgeName, p: T, validators = base): string {
    validate(p as Record<string, unknown>, validators);
    return this.client.buildUrl(
      `/api/badge/${t}`,
      p as Record<string, unknown>,
    );
  }

  private badgeSvg<T>(t: BadgeName, p: T, validators = base): Promise<string> {
    validate(p as Record<string, unknown>, validators);
    return this.client.fetchText(
      `/api/badge/${t}`,
      p as Record<string, unknown>,
    );
  }
}
