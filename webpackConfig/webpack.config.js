const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HtmlwebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const config = require('./config.json');

const BUILD_PATH = path.resolve(__dirname,config.output);
const SRC_PATH = path.join(__dirname,'..','src');

let webpackConfig = {
    entry: config.entry,
    output: {
        filename: '[name].[hash].js',
        path: BUILD_PATH
    },
    module: {
        rules: [
          {
            test: /\.(sa|sc|c)ss$/,
            use: [
              process.env.NODE_ENV !== 'production' ? {loader:'style-loader',options:{sourceMap:config.sourceMap}} : {loader:MiniCssExtractPlugin.loader,options:{sourceMap:config.sourceMap}},
              {loader:'css-loader',options:{sourceMap:config.sourceMap}},
              {loader:'postcss-loader',options:{sourceMap:config.sourceMap,plugins: [require("autoprefixer")]}},
              {loader:'sass-loader',options:{sourceMap:config.sourceMap}}
            ]
          },
          {
            test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
            loader: 'url-loader',
            options: {
              limit: config.imageLimit
            }
          },
          {
            test: /\.(js|jsx)$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
                plugins: [
                    require('@babel/plugin-proposal-object-rest-spread'),
                    '@babel/plugin-transform-runtime'
                ]
              }
            }
          },
          {
            test:/\.vue$/,
            use:'vue-loader'
          }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].[hash].css",
            chunkFilename: "[id].css"
        }),
        new HtmlwebpackPlugin({
            title: 'webpack-test',
            template: './src/index.html',
            inject: 'body',
            chunks:'',
            filename:'index.html'
        }),
        new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    optimization:{
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions:{
                    compress:{
                        warnings: false,
                        drop_debugger:true,
                        drop_console:config.dropConsole
                    }
                },
                cache: true,
                parallel: true,
                sourceMap: config.sourceMap
            })
        ]
    },
    devServer: {
        proxy: config.proxy,
        contentBase:BUILD_PATH,
        compress: true,
        hot: true,
        hotOnly: true,
        https: false, 
        host: config.host,
        port: config.port,
        open: config.open
    },
    resolve: {  //导入的时候不用写拓展名
        extensions: [' ', '.js', '.json', '.vue', '.scss','.sass', '.css','.json'],
        alias: {
            '@': SRC_PATH
          }
    }
}

module.exports = webpackConfig