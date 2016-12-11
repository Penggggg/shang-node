var webpack = require('webpack');

module.exports = {
    entry: {
        app: "./src/index.ts"
    },

    output: {
        filename: "[name].js",
        path:"./dist"
    },

    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        loaders: [
            { test: /\.ts?$/, loader: "ts-loader", exclude: ['node_modules'] }
        ]
    },

    plugins: [ 
        new webpack.DefinePlugin({
           'process.env': {
				'ENV': JSON.stringify('develoption')
			}
        })
    ],

};