import {logger as _logger} from '@/lib/logger/logger';

export {
  clientLogger,
  createClientLogger,
  type ClientLogger,
} from '@/lib/logger/client-logger';
export {logger, type Logger} from '@/lib/logger/logger';

export function getLogger(context: string) {
  return _logger.child({context});
}
