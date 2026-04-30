import { logger as _logger } from './logger';

export { logger, type Logger } from './logger';
export { clientLogger, createClientLogger, type ClientLogger } from './client-logger';

export function getLogger(context: string) {
  return _logger.child({ context });
}
