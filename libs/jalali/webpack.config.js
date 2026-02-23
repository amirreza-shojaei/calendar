const path = require("path");
const GeneratePackageJsonPlugin = require("generate-package-json-webpack-plugin");

module.exports = {
    mode: "production",
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js",
        clean: true,
        library: {
            type: "module"
        }
    },
    experiments: {
        outputModule: true
    },
    optimization: {
        minimize: false
    },
    plugins: [
        new GeneratePackageJsonPlugin({
            name: "jalali-lib",
            version: "1.0.0",
            main: "./main.js"
        })
    ]
};