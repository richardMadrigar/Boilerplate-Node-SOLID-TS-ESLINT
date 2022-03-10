import pretty from 'pino-pretty';
import pino from 'pino';

const pinoStyles = pretty({
  colorize: true,
  levelFirst: true,
  translateTime: 'dd-mm-yyyy HH:MM:ss',
});

const logger = pino(
  { level: 'info' },
  pinoStyles,
);

export default logger;
