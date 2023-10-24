import * as webpack from 'webpack';

export function buildBabelLoader(isDev: boolean): webpack.RuleSetRule {
    return {
        test: /\.(?:js|jsx|tsx)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: [['@babel/preset-env', { targets: 'defaults' }]]
            }
        }
    };
}
