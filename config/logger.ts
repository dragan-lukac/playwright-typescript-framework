import fs from 'fs';
import path from 'path';

export type LogLevel = 'debug' | 'info' | 'error';

const LEVELS: Record<LogLevel, number> = { debug: 0, info: 1, error: 2 };
const DEFAULT_LEVEL: LogLevel = 'info';

function getLogFile(): string {
  const date = new Date().toISOString().slice(0, 10);
  const dir = path.resolve(__dirname, '../logs');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  return path.join(dir, `${date}.log`);
}

function write(level: LogLevel, message: string): void {
  const configured = (process.env.LOG_LEVEL ?? DEFAULT_LEVEL) as LogLevel;
  if (LEVELS[level] < LEVELS[configured]) return;
  const line = `[${new Date().toISOString()}] [${level.toUpperCase()}] ${message}`;
  console.log(line);
  fs.appendFileSync(getLogFile(), line + '\n');
}

export function isEnabled(level: LogLevel): boolean {
  const configured = (process.env.LOG_LEVEL ?? DEFAULT_LEVEL) as LogLevel;
  return LEVELS[level] >= LEVELS[configured];
}

export const logger = {
  debug: (msg: string) => write('debug', msg),
  info:  (msg: string) => write('info',  msg),
  error: (msg: string) => write('error', msg),
};
