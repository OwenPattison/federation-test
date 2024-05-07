declare const __dirname: string;
import * as path from "path";

import { VueLoaderPlugin } from "vue-loader";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import * as webpack from "webpack";

export default (env = {}) => ({
    mode: "development",
    cache: false,
    target: 'es2020',
    devtool: false,
    entry: path.resolve(__dirname, "./src/main.ts"),
    // output: {
    //   path: path.resolve(__dirname, './dist'),
    //   publicPath: '/dist/'
    // },
    experiments: {
        outputModule: true
    },
    output: {
        // library: {type: 'module'},
        publicPath: 'auto'
    },
    resolve: {
        extensions: [".vue", ".jsx", ".tsx", ".ts", ".js", ".json"],
        alias: {
            // this isn't technically needed, since the default `vue` entry for bundlers
            // is a simple `export * from '@vue/runtime-dom`. However having this
            // extra re-export somehow causes webpack to always invalidate the module
            // on the first HMR update and causes the page to reload.
            // vue: "@vue/runtime-dom",
        },
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: "vue-loader",
                        options: {
                            esModule: false
                        }
                    }
                ],
            },
            {
                test: /\.png$/,
                use: {
                    loader: "url-loader",
                    options: { limit: 8192 },
                },
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {},
                    },
                    "css-loader",
                ],
            },
            {
                test: /\.tsx?$/,
                include: path.resolve(__dirname, "src"),
                use: [
                    {
                        loader: "babel-loader",
                    },
                    {
                        loader: "ts-loader",
                        options: {
                            appendTsxSuffixTo: [/\.vue$/],
                            transpileOnly: true
                        }
                    }
                ]
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
        new webpack.container.ModuleFederationPlugin({
            name: "home",
            filename: "remoteEntry.js",
            library: { type: 'module' },
            remotes: {
                remoteVue3App: "./remoteVue3App/assets/remoteEntry.js",
            },
            // remoteType:'module',
            // shared: {
            //     vue: {
            //         // singleton: true,
            //         // import: false,
            //         requiredVersion: '^3.0.0'
            //     }
            // }
        }),
        new HtmlWebpackPlugin({
            template: "./index.ejs",
            inject: false
        }),
        new VueLoaderPlugin(),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname),
        },
        compress: true,
        port: 5001,
        hot: false,
        liveReload: true,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers":
                "X-Requested-With, content-type, Authorization",
        },
    },
});