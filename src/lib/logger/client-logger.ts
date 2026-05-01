type LogLevel = 'debug' | 'info' | 'warn' | 'error';
type LogContext = Record<string, unknown>;

export interface ClientLogger {
  debug(msg: string, ctx?: LogContext): void;
  info(msg: string, ctx?: LogContext): void;
  warn(msg: string, ctx?: LogContext): void;
  error(msg: string, ctx?: LogContext): void;
}

export function createClientLogger(name: string): ClientLogger {
  const isProduction = process.env.NODE_ENV === 'production';

  function log(level: LogLevel, msg: string, ctx?: LogContext) {
    const entry = {level, name, msg, ...ctx, ts: new Date().toISOString()};
    const fn =
      level === 'error'
        ? console.error
        : level === 'warn'
          ? console.warn
          : level === 'debug'
            ? // eslint-disable-next-line no-console
              console.debug
            : // eslint-disable-next-line no-console
              console.info;
    fn(`[${name}] ${msg}`, ctx ?? '');
    if (isProduction && level !== 'debug') {
      fetch('/api/logs', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(entry),
        keepalive: true,
        // eslint-disable-next-line no-empty-function
      }).catch(() => {});
    }
  }

  return {
    debug: (msg, ctx) => log('debug', msg, ctx),
    info: (msg, ctx) => log('info', msg, ctx),
    warn: (msg, ctx) => log('warn', msg, ctx),
    error: (msg, ctx) => log('error', msg, ctx),
  };
}

export const clientLogger = createClientLogger('app');
