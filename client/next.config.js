module.exports = {
  webpackDevMiddleware: config => {
    config.watchOptions.pll=300;
    return config;
  }
};