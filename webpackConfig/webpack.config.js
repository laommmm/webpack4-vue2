const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HtmlwebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')
const config = require('./config.json');

const BUILD_PATH = path.resolve(__dirname,config.output);
const MOCK_PATH = path.resolve(__dirname,config.mockpath);
const SRC_PATH = path.join(__dirname,'..','src');

const isDev = process.env.NODE_ENV !== 'production';

let mode = '';
let ug = false;
if(process.env.NODE_ENV === 'production'){
    mode = 'production';
    ug = true;
}else if(process.env.NODE_ENV === 'development'){
    mode = 'development';
    ug = false;
}else{
    mode = 'none';
    ug = true;
}

let webpackConfig = {
    mode:mode,
    entry: {
        index:['babel-polyfill',config.entry],
        commons:['vue','v-tap','vue-router','vue-axios','axios']
    },
    output: {
        filename: 'js/[name].[hash].js',
        path: BUILD_PATH
    },
    module: {
        rules: [
          {
            test: /\.(sa|sc|c)ss$/,
            use: [
              isDev ? {loader:'style-loader',options:{sourceMap:config.sourceMap}} : MiniCssExtractPlugin.loader,
              'css-loader',
              'postcss-loader',
              'sass-loader'
            ]
          },
          {
            test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
            loader: 'url-loader',
            options: {
              limit: config.imageLimit,
              name:'./images/[name].[hash].[ext]',
              fallback:'file-loader'
            }
          },
          {
            test: /\.(js|jsx)$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader'
            }
          },
          {
            test:/\.vue$/,
            use:['vue-loader']
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
            filename:'index.html',
            minify:{ 
                removeAttributeQuotes: true,
                collapseWhitespace:true
            }
        }),
        new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    optimization:{
        minimize: ug,
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
            }),
            new OptimizeCSSAssetsPlugin({})
        ],
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
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

if(process.env.NODE_ENV === 'mock'){
    webpackConfig.plugins.push(
        new CopyWebpackPlugin([{
            from: MOCK_PATH,
            to: path.resolve(BUILD_PATH,'mock')
        }])
    )
}

module.exports = webpackConfig