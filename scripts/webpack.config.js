const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const cwdDir = process.cwd();

const rules = [
    {
        test: /\.(png|jpg|gif)$/i,
        use: [
            {
                loader: 'url-loader',
                options: {
                    limit: false,
                },
            },
        ],
    },
    {
        test: /\.tsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
            loader: 'swc-loader',
            options: {
                jsc: {
                    transform: {
                        legacyDecorator: true,
                        decoratorMetadata: true,
                    },
                    parser: {
                        syntax: 'typescript',
                        decorators: true,
                        tsx: true,
                    },
                    target: 'es2017',
                    loose: false,
                    minify: {
                        compress: false,
                        mangle: false,
                    },
                },
                module: {
                    type: 'es6',
                },
                minify: false,
                isModule: true,
            },
        },
    },
];

module.exports = (_, { mode }) => {
    return [
        {
            entry: path.resolve(cwdDir, './src/index.ts'),
            output: {
                path: path.resolve(cwdDir, './dist'),
                filename: 'bundle[fullhash].js',
            },
            target: 'web',
            devtool: 'source-map',
            mode,
            resolve: {
                extensions: ['.ts', '.tsx', '.js'],
                alias: {},
            },
            module: {
                rules,
            },
            plugins: [
                new HtmlWebpackPlugin({
                    template: path.resolve(cwdDir, './src/index.html'),
                    filename: 'index.html',
                    minify: false,
                }),
            ],
            devServer: {
                open: true,
                // contentBase: path.resolve(cwdDir, './dist'),
                compress: true,
                port: 8888,
                proxy: {
                    // '/api': 'http://localhost:8080'
                },
            },
        },
    ];
};
