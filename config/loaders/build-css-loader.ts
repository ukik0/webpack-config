import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as webpack from 'webpack';

import autoprefixer from 'autoprefixer';

export function buildCssLoader(isDev: boolean): webpack.RuleSetRule {
    return {
        test: /\.(c|sa|sc)ss$/i,
        use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader',
                options: {
                    modules: {
                        auto: true,
                        localIdentName: isDev ? '[path][name]__[local]--[hash:base64:5]' : '[hash:base64:8]'
                    }
                }
            },
            {
                loader: 'postcss-loader',
                options: {
                    postcssOptions: {
                        plugins: [
                            [autoprefixer({ overrideBrowserslist: ['ie >= 8', 'last 4 version'] })],
                            ['postcss-preset-env']
                        ]
                    },
                    sourceMap: true
                }
            },
            'sass-loader'
        ]
    };
}
