var webpack = require('webpack');
var path = require('path');
const merge = require('webpack-merge');

module.exports = () => {
    const sharedConfig = () => ({
        resolve: { extensions: ['.js', '.jsx'] },
        module: {
            noParse: /node_modules\/reactstrap-tether\/dist\/js\/tether.js/,
            rules: [
                {
                    test: /.jsx?$/,
                    loader: 'babel-loader',
                    exclude: /node-modules/,
                    query: {
                        presets: ['es2015', 'react', 'stage-0'],
                        plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
                    }
                },
                {
                    test: /\.css$/,
                    loaders: ['style-loader', 'css-loader']
                },
                {
                    test: /\.png$/,
                    loader: 'url-loader',
                    query: {
                        mimetype: 'image/png',
                        limit: 100000
                    }
                },
                {
                    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'url-loader',
                    query: {
                        mimetype: 'image/svg+xml',
                        limit: 10000
                    }
                },
                {
                    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'url-loader',
                    query: {
                        mimetype: 'application/octet-stream',
                        limit: 10000
                    }
                },
                {
                    test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'url-loader',
                    query: {
                        mimetype: 'application/font-woff',
                        limit: 10000
                    }
                },
                {
                    test: /\.(jpg|eot)$/,
                    loader: 'file-loader'
                }
            ]
        }
    });

    const clientBundleConfig = merge(sharedConfig(),
        {
            devtool: 'source-map',
            entry: {
                'main': './ClientApp/client.jsx'
            },
            output: {
                path: __dirname + '/wwwroot/dist/',
                publicPath: '/dist/',
                filename: 'client.js'
            },
            plugins: [
            ]
        });

    const serverBundleConfig = merge(sharedConfig(),
        {
            entry: { 'server': './ClientApp/server.jsx' },
            output: {
                libraryTarget: 'commonjs',
                path: __dirname + '/ClientApp/dist/',
                publicPath: '/ClientApp/dist/',
                filename: 'server.js'
            },
            plugins: [
            ],
            target: 'node'
        });

    return [clientBundleConfig, serverBundleConfig];
};