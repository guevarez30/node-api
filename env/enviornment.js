/*
    References:
    https://www.npmjs.com/package/dotenv-extended
    https://github.com/niftylettuce/dotenv-parse-variables
*/

import dotenvParseVariables from 'dotenv-parse-variables';
import dotenvMustache from 'dotenv-mustache';
import dotenvExtended from 'dotenv-extended';

export function initEnv() {
  if (process.env.NODE_ENV === 'development') {
    let env = dotenvExtended.load({
      encoding: 'utf8',
      silent: true,
      path: '/env/.env.development',
      defaults: './env/.env.default',
      schema: './env/.env.schema',
      errorOnMissing: false,
      errorOnExtra: false,
      errorOnRegex: false,
      includeProcessEnv: true,
      assignToProcessEnv: true,
      overrideProcessEnv: false,
    });
    env = dotenvMustache(env);
    env = dotenvParseVariables(env);
    process.env = env;
  } else {
    process.env = dotenvParseVariables(process.env);
  }
}
