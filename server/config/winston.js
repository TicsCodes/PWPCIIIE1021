// Importanto a Winston
import winston, { format } from 'winston';
import appRoot from 'app-root-path';

// Componentes para crear el formato personalizado
const { combine, timestamp, printf, colorize, uncolorize, json } = format;

// Perfil de color para el log
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'green',
};
// Agregando el perfil a winston
winston.addColors(colors);

// Formato de consola
const myFormat = combine(
  colorize({ all: true }),
  timestamp(),
  printf((info) => `${info.timestamp} ${info.level}: ${info.message}}`),
);

// Formato para la salida de los archivos de log
const myFileFormat = combine(uncolorize(), timestamp(), json());

// Creando objetos de configuracion
const options = {
  infoFile: {
    level: 'info',
    filename: `${appRoot}/server/logs/infos.log`,
    handleExeptions: true,
    maxsize: 5242880, // 5 mb
    maxFiles: 5,
    format: myFileFormat,
  },

  warnFile: {
    level: 'warn',
    filename: `${appRoot}/server/logs/warns.log`,
    handleExeptions: true,
    maxsize: 5242880, // 5 mb
    maxFiles: 5,
    format: myFileFormat,
  },

  errorFile: {
    level: 'error',
    filename: `${appRoot}/server/logs/errors.log`,
    handleExeptions: true,
    // eslint-disable-next-line spaced-comment
    maxsize: 5242880, //5 mb
    maxFiles: 5,
    format: myFileFormat,
  },

  console: {
    level: 'debug',
    handleExeptions: true,
    format: myFormat,
  },
};

// Creando la instancia del logger
const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.infoFile),
    new winston.transports.File(options.warnFile),
    new winston.transports.File(options.errorFile),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false, // No finaliza en excepciones manejadas
});

// Manejo para un stream de entrada
logger.stream = {
  write(message) {
    logger.info(message);
  },
};

export default logger;
