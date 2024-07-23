const JSZip = require('jszip');
const { RawSource } = require('webpack-sources');

class ZipPlugin {
  constructor(options) {
    this.options = options;
  }
  
  apply(complier) {
    let context = this;
    complier.hooks.emit.tapAsync('zipPlugin', (compilation, callback) => {
      const zip = new JSZip();
      // 把打包后的文件夹添加到zip中
      Object.keys(compilation.assets).forEach(filename => {
        const content = compilation.assets[filename].source();
        zip.file(filename, content);
      })

      zip.generateAsync({ type: 'nodebuffer' }).then(res => {
        compilation.assets[context.options.filename] = new RawSource(res);
        callback();
      })
    })
  }
} 

module.exports = ZipPlugin;