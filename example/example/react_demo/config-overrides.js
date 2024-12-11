/* config-overrides.js */
const path = require('path')
const { override, overrideDevServer, addWebpackAlias } = require('customize-cra');
process.env.PORT = 8999
// 跨域配置
const devServerConfig = () => config => {
    return {
      ...config,
    }
  }
  
module.exports = {
    webpack: override(
        addWebpackAlias({
            // ["pdfview$"]: path.resolve(__dirname, "../../dist/index.js")
        }),
    ),
    devServer: overrideDevServer(
      devServerConfig()
    )
  }

