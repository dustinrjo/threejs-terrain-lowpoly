module.exports = {
    entry: "./sourcecode/index.js",
    devtool: "eval",
    output: {
        path: __dirname,
        filename: "js.js"
    },
    module: {
        loaders: [
            { test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader?optional=runtime' }
        ]

    }
};