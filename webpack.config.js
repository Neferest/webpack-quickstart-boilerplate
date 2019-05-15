const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge');

const config = (env) => require(`./webpack/webpack.${env.mode}.js`)(env);
const loadAddons = require(`./webpack/webpack.addons.js`);

module.exports = env => {
    const { mode, addons = [] } = env;
    return webpackMerge(loadAddons(addons), config(env), {
        mode,
        devServer: {
            historyApiFallback: true,
            hot: true
        },
        entry: './src/index.js',
        output: {
            filename: 'bundle.js',
            path: path.join(__dirname, '/dist')
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./public/index.html",
            })
        ],
        module: {
            rules: [
                // Babel - JS & JSX files
                { 
                    test: /\.(js|jsx)$/,  
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env", "@babel/preset-react"],
                            plugins: [
                                "@babel/plugin-proposal-class-properties",
                                "@babel/plugin-syntax-dynamic-import"
                            ]
                        }
                    },
                    exclude: /node_modules/,
                },
                // Images files
                {
                    test: /\.(jpe?g|png|gif)$/,
                    use: 'file-loader'
                }
            ]
        }
    });
}