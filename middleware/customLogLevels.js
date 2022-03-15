const
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  HTTP = 3,
  VERBOSE = 4,
  DEBUG = 5,
  error = 'red',
  warn = 'darkred',
  info = 'black',
  http = 'green',
  verbose = 'blue',
  debug = 'gray';
export const colors = {
  error,
  warn,
  info,
  http,
  verbose,
  debug
}
export const levels = {
  error: ERROR,
    warn: WARN,
    info: INFO,
    http: HTTP,
    verbose: VERBOSE,
    debug: DEBUG
}

export const customLevels = {colors, levels}