const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HtmlwebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const config = require('./config.json');

const BUILD_PATH = path.resolve(__dirname, config.output);
const MOCK_PATH = path.resolve(__dirname, config.mockpath);
const SRC_PATH = path.join(__dirname, '..', 'src');

let mode = '';
let ug = false;
if (process.env.NODE_ENV === 'production') {
    mode = 'production';
    ug = true;
} else if (process.env.NODE_ENV === 'development') {
    mode = 'development';
    ug = false;
} else {
    mode = 'none';
    ug = true;
}

let webpackConfig = {
    mode: mode,
    entry: {
        index: config.entry,
        commons: ['vue', 'v-tap', 'vue-router']
    },
    output: {
        filename: 'js/[name].bundle.js',
        path: BUILD_PATH,
        chunkFilename: "chunks/[name].[chunkhash:8].js"
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader"
                ]
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
                options: {
                    limit: config.imageLimit,
                    name: './css/images/[name].[hash:8].[ext]',
                    fallback: 'file-loader',
                    publicPath: '../'
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
                test: /\.vue$/,
                use: ['vue-loader']
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name].[hash].css",
            chunkFilename: "css/[id].[hash].css"
        }),
        new HtmlwebpackPlugin({
            title: '洞庭湖通识课',
            template: './src/index.html',
            inject: 'body',
            favicon: './favicon.ico',
            chunks: '',
            filename: 'index.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            }
        }),
        new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new CopyWebpackPlugin([{
            from: path.resolve(SRC_PATH, 'webuploader'),
            to: path.resolve(BUILD_PATH, 'webuploader')
        }])
    ],
    optimization: {
        minimize: ug,
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        warnings: false,
                        drop_debugger: true,
                        drop_console: config.dropConsole
                    }
                },
                cache: true,
                parallel: true,
                sourceMap: config.sourceMap
            }),
            new OptimizeCSSAssetsPlugin({})
        ],
        splitChunks: {
            chunks: "all",
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: true
        }
    },
    devServer: {
        proxy: config.proxy,
        contentBase: BUILD_PATH,
        compress: true,
        hot: true,
        hotOnly: true,
        https: false,
        host: config.host,
        port: config.port,
        open: config.open
    },
    resolve: {  //导入的时候不用写拓展名
        extensions: [' ', '.js', '.json', '.vue', '.scss', '.sass', '.css', '.json'],
        alias: {
            '@': SRC_PATH
        }
    }
};

if (process.env.NODE_ENV === 'mock') {
    webpackConfig.plugins.push(
        new CopyWebpackPlugin([{
            from: MOCK_PATH,
            to: path.resolve(BUILD_PATH, 'mock')
        }])
    )
}

module.exports = webpackConfig