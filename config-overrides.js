 const { override, fixBabelImports, addLessLoader, addDecoratorsLegacy } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
   style: 'css',
   style: true,
  }),
 addLessLoader({
   javascriptEnabled: true,
   modifyVars: { '@primary-color': '#fd0' },
 }),

 addDecoratorsLegacy()
);
