const generator = require('@babel/generator').default;

const consolePlugin = function({ types }) {
  return {
    visitor: {
      CallExpression(path, state) {
        const name = generator(path.node.callee).code;
        if (['console.log', 'console.info', 'console.warn', 'console.error'].includes(name)) {
          const { filename, cwd } = state.file.opts;
          const relativePath = filename.replace(cwd, '');
          const { line } = path.node.loc.start;
          path.node.arguments.push(types.stringLiteral(`\n*** filepath: ${relativePath}  line: ${line} ***`));
        }
      }
    } 
  }
}

module.exports = consolePlugin;