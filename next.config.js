/* eslint-disable @typescript-eslint/no-var-requires */

module.exports = {
  env: {
    API_URL: process.env.API_URL,
    API_AUTHORITY: process.env.API_AUTHORITY,
    ENABLE_PAID_FEATURES: process.env.ENABLE_PAID_FEATURES,
    SLUG: process.env.CI_ENVIRONMENT_SLUG,
    NEW_RELIC_LICENSE_KEY: process.env.NEW_RELIC_LICENSE_KEY,
    NEWRELIC_APP_ID: process.env.NEWRELIC_APP_ID,
  },
};
