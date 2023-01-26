const HtmlWebpackPlugin = require("html-webpack-plugin");
const {ModuleFederationPlugin} = require("webpack").container;
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");
const InterpolateHtmlPlugin = require("interpolate-html-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    static: path.join(__dirname, "dist"),
    port: 5001,
  },
  output: {
    publicPath: "auto",
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
        {
            test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
            exclude: /node_modules/,
            use: ['file-loader?name=[name].[ext]'] // ?name=[name].[ext] is only necessary to preserve the original file name
        },
        {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
        },
        {
            test: /\.s[ac]ss$/i,
            use: [
              // Creates `style` nodes from JS strings
              "style-loader",
              // Translates CSS into CommonJS
              "css-loader",
              // Compiles Sass to CSS
              "sass-loader",
            ],
        },
        {
          test: /\.tsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            presets: ['@babel/preset-react', '@babel/preset-typescript'],
          },
        },
      ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "@cwp/ui",
      remotes: {
        "@typescript-monorepo/app2": `promise new Promise(resolve => {
          const remoteUrlWithVersion = 'http://localhost:5002/remoteEntry.js'
          const script = document.createElement('script')
          script.src = remoteUrlWithVersion
          script.onload = () => {
            // the injected script has loaded and is available on window
            // we can now resolve this Promise
            const proxy = {
              get: (request) => window._cwp_siteop.get(request),
              init: (arg) => {
                try {
                  return window._cwp_siteop.init(arg)
                } catch(e) {
                  console.log('remote container already initialized')
                }
              }
            }
            resolve(proxy)
          }
          // inject this script with the src set to the versioned remoteEntry.js
          document.head.appendChild(script);
        })
        `
      },
      library: {
        type: 'global',
        name: '_cwp_ui'
      },
      shared: {react: {singleton: true, eager: true, requiredVersion: "^18.2.0"}, "react-dom": {singleton: true, eager: true, requiredVersion: "^18.2.0"}},
    }),
    new ExternalTemplateRemotesPlugin(),
    new InterpolateHtmlPlugin({
        PUBLIC_URL: 'static' // can modify `static` to another name or get it from `process`
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico",
      manifest: "./public/manifest.json"
    }),
  ],
};

