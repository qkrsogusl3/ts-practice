const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    mode: 'development',
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'index.js'
    },
    module: {
        rules: [
            { test: /\.css$/, use: 'css-loader' },
            { test: /\.ts$/, use: 'awesome-typescript-loader' },
            {
                enforce: "pre", 
                test: /\.js$/, 
                loader: "source-map-loader", 
                exclude: [
                    path.join(process.cwd(), 'node_modules')
                ]
            },
            { enforce: 'pre', test: /\.ts$/, loader: 'tslint-loader' }
        ]
    },
    resolve: {
        extensions: [".ts", ".js", ".json"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            inject: false
        })
    ]
};

module.exports = config;