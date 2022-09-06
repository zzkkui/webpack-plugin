/*
 * @Author: zzkkui 
 * @Date: 2022-09-06 16:52:18 
 * @Last Modified by:   zzkkui 
 * @Last Modified time: 2022-09-06 16:52:18 
 */

class MyPlugin {
  constructor(options) {
    this.options = options
  }
  // Webpack 会调用 MyPlugin 实例的 apply 方法给插件实例传入 compiler 对象
  apply(compiler) {
    compiler.hooks.emit.tapAsync(
      'MyPlugin',
      (compilation, callback) => {
        // console.log('compiler========>', compiler);
        // console.log('compilation========>', compilation);
        // console.log('options========>', this.options);


        // 使用webpack提供的 API 操作
        // compilation.addModule(/* ... */);
        // 处理完毕后执行 callback 以通知 Webpack
        // 如果不执行 callback，运行流程将会一直卡在这不往下执行
        callback();
      }
    );
  }
}

module.exports = MyPlugin