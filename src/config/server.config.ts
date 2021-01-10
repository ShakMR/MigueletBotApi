const { PORT = 3000, LOGGING = 1 } = process.env;

const LOGGING_LEVELS = [false, true, ['error', 'warn']];

export default {
  PORT: PORT,
  LOGGING: LOGGING_LEVELS[LOGGING],
};
