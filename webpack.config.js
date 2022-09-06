const path = require("path");
const MyPlugin = require('./plugins/myPlugin.js')
const FileListPlugin = require('./plugins/fileListPlugin.js')
const FileTitlePlugin = require('./plugins/fileTitlePlugin.js')


module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "development",
  plugins: [
    new MyPlugin({
      text: 'zzkk'
    }),
    new FileListPlugin(),
    new FileTitlePlugin()
  ]
};