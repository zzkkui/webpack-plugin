class FileTitlePlugin {
  static defaultOptions = {
    fileHeader: `/*
* @BuildDate: ${new Date().toLocaleString()} 
*/`,
    extensions: ['js', 'css']
  };

  constructor() {
    this.options = { ...FileTitlePlugin.defaultOptions };
  }

  apply(compiler) {
    const pluginName = FileTitlePlugin.name;

    compiler.hooks.emit.tap(pluginName, (compilation, callback) => {

      const assets = Object.keys(compilation.assets).filter((assetPath) => {
        const splitted = assetPath.split(".");
        const extension = splitted[splitted.length - 1];
        return this.options.extensions.includes(extension);
      });

      console.log(assets)

      assets.forEach((asset) => {
        const content = `${this.options.fileHeader}\n\n${compilation.assets[asset].source()}`;

        // 修改资源
        compilation.assets[asset] = {
          // 最终资源输出时，调用source方法，source方法的返回值就是资源的具体内容
          source() {
            return content;
          },
          // 资源大小
          size() {
            return content.length;
          },
        };
      })
    });
  }
}

module.exports = FileTitlePlugin;