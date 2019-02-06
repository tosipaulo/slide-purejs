const webpack = require('webpack');
const modeDev = process.env.NODE_ENV !== 'production';

const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

module.exports =  {
    mode: modeDev ? 'development' : 'production',
    entry: __dirname + '/src/assets/js/index.js',
    output: {
        filename: 'js/[name].js',
        path: __dirname + '/dist'
    },
    devServer: {
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000,
        },
        contentBase: "./src",
        compress: true,
        host: '0.0.0.0',
        port: 9000,
        disableHostCheck: true
    },
    optimization: {
        minimizer: [
            new UglifyjsWebpackPlugin({
                cache: true,
                parallel: true
            })
        ]
    },
    plugins: [
        new CleanWebpackPlugin('dist', {}),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/index.html',
            filename: 'index.html',
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    autoprefixer()
                ]
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        })
    ],
    module: {
        rules: [
            {
                test: /\.s?[ac]ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
            },
            {
                test: /\.(png|svg|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: { name: 'images/[name].[hash:6].[ext]', publicPath: '../', limit: 8192 },
                    }
                ]
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: { name: 'fonts/[name].[hash:6].[ext]', publicPath: '../', limit: 8192 },
                    },
                ],
            }
        ]
    }
}