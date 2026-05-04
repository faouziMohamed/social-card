import type {BadgeName} from './badge-schemas';

export const DEMO_PARAMS: {template: BadgeName; params: string}[] = [
  {
    template: 'label',
    params:
      'label=version&message=1.0.0&color=%236366f1&labelColor=%23555555&style=flat&theme=dark',
  },
  {
    template: 'stat',
    params: 'label=Stars&value=4.2k&icon=star&color=%236366f1&theme=dark',
  },
  {
    template: 'status',
    params: 'label=API&status=online&theme=dark',
  },
  {
    template: 'progress',
    params: 'label=Coverage&value=87&color=%2322c55e&width=220&theme=dark',
  },
  {
    template: 'score',
    params: 'label=Performance&value=95&max=100&color=%236366f1&theme=dark',
  },
  {
    template: 'socials',
    params:
      'platform=github&handle=acme&followers=4.2k&color=%236366f1&theme=dark',
  },
  {
    template: 'tech-stack',
    params:
      'stack=React%2CTypeScript%2CGo&color=%236366f1&style=tags&theme=dark',
  },
  {
    template: 'availability',
    params: 'label=Mohamed+Faouzi&available=true&color=%236366f1&theme=dark',
  },
];
