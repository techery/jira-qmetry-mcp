/**
 * Logger utility for MCP server that writes to stderr to avoid interfering with the protocol
 */

export interface LogLevel {
  DEBUG: 'debug';
  INFO: 'info';
  WARN: 'warn';
  ERROR: 'error';
}

export const LOG_LEVELS: LogLevel = {
  DEBUG: 'debug',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
};

export interface LogEntry {
  timestamp: string;
  level: string;
  message: string;
  data?: any;
  context?: string;
}

/**
 * Log a message to stderr with structured format
 * @param level Log level (debug, info, warn, error)
 * @param message Log message
 * @param data Optional data to include
 * @param context Optional context (e.g., function name, module)
 */
export function log(
  level: string,
  message: string,
  data?: any,
  context?: string
) {
  const logEntry: LogEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    data,
    context,
  };

  process.stderr.write(`${JSON.stringify(logEntry)}\n`);
}

/**
 * Convenience methods for different log levels
 */
export const logger = {
  debug: (message: string, data?: any, context?: string) =>
    log(LOG_LEVELS.DEBUG, message, data, context),
  info: (message: string, data: any, context?: string) =>
    log(LOG_LEVELS.INFO, message, data, context),
  warn: (message: string, data?: any, context?: string) =>
    log(LOG_LEVELS.WARN, message, data, context),
  error: (message: string, data?: any, context?: string) =>
    log(LOG_LEVELS.ERROR, message, data, context),
};

/**
 * Simple debug function for quick logging during development
 * @param message Message to log
 * @param data Optional data
 */
export function debug(message: string, data?: any) {
  if (process.env.NODE_ENV === 'development') {
    process.stderr.write(
      `DEBUG: ${message}${data ? ` - ${JSON.stringify(data)}` : ''}\n`
    );
  }
}
