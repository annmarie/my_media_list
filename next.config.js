const _ = require('lodash');

module.exports = (phase, { defaultConfig }) => {
  const newConfig = {
    env: {
      // set env vars
      MY_APP_KEY: process.env.MY_APP_KEY,
      APP_PHASE: phase
    },
    async rewrites() {
      return {
        fallback: [
          {
            source: '/subscription/:id',
            destination: '/'
          },
          {
            source: '/subscription',
            destination: '/'
          },
          {
            source: '/',
            destination: '/'
          }
        ]
      };
    }
  };

  return _.merge(defaultConfig, newConfig);
};
