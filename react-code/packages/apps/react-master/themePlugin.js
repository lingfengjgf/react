const postcss = require('postcss');
const { groups } = require('./colorCard');

const defaults = {
  functionName: 'mycolor',
  groups: {},
  darkThemeSelector: 'html[data-theme="dark"]',
  nestingPlugin: null
}

module.exports = postcss.plugin('postcs-theme-colors', (options) => {

  options = Object.assign({}, defaults, options);

  // 匹配 mycolor(*)
  const regGroup = new RegExp(`\\b${options.functionName}\\(([^)]+)\\)`, 'g');

  return (style, result) => {

    // 获取颜色
    const getValue = (value, theme) => {
      return value.replace(regGroup, (match, group) => {
        return options.groups[group]?.[theme]
      })
    }
    const hasPlugin = (name) => 
      name.replace(/^postcss-/, '') === options.nestingPlugin || 
      result.processor.plugins.some(plugin => plugin.postcssPlugin === name)

    style.walkDecls((decl) => {
      const value = decl.value;

      if (!value || !regGroup.test(value)){
        return ;
      }

      const lightValue = getValue(value, 'light');
      const darkValue = getValue(value, 'dark');

      const darkDecl = decl.clone({ value: darkValue })
        
      let darkRule;
      // 通过nest插件 生成dark主题样式
      if (hasPlugin('postcss-nesting')) {
        darkRule = postcss.atRule({
          name: 'nest',
          params: `${options.darkThemeSelector} &`
        })
      } else if (hasPlugin('postcss-nested')) {
        darkRule = postcss.rule({
          params: `${options.darkThemeSelector} &`
        })
      } else {
        decl.warn(result, 'no plugin nest find');
      }

      if (darkRule) {
        darkRule.append(darkDecl);
        decl.after(darkRule);
      }

      const lightDecl = decl.clone({ value: lightValue });
      decl.replaceWith(lightDecl);
    })
  }
})