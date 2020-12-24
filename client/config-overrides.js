const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");

module.exports = function override(config) {
  config.plugins.push(new AntdDayjsWebpackPlugin());
  return config;
};
