class FileListPlugin {
  static defaultOptions = {
    outputFile: 'buildLog.md',
  };

  constructor(options = {}) {
    this.options = { ...FileListPlugin.defaultOptions, ...options };
  }

  apply(compiler) {
    const pluginName = FileListPlugin.name;
    // webpack: webpack 实例
    // Compilation: 编译对象
    // sources: 资源来源
    const { webpack: {
      Compilation,
      sources: {
        RawSource
      }
    } } = compiler;

    // 在初始化编译时执行，compilation事件之前
    compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {

      // 资源处理钩子
      compilation.hooks.processAssets.tap(
        {
          name: pluginName,
          stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE,
        },
        (assets) => {
          let content = `buildTime: ${new Date().toLocaleString()}\n\n`
          content += `| fileName  | fileSize  |\n| --------- | --------- |\n`
          Object.entries(assets).forEach(([pathname, source]) => {
            content += `| ${pathname} | ${source.size()} bytes |\n`
          })

          // 输出资产
          compilation.emitAsset(
            this.options.outputFile,
            new RawSource(content)
            // content
          );
        }
      );
    });
  }
}

module.exports = FileListPlugin;