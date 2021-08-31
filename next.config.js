module.exports = {
  webpack(config) {
    const stylesRule = config.module.rules
      .find((x) => !!x.oneOf)
      .oneOf.filter(
        (x) => ('test.module.scss'.match(x.test) || 'test.module.css'.match(x.test)) && Array.isArray(x.use)
      );

    for (const rule of stylesRule) {
      const cssLoader = rule.use.find((u) => u.loader.match('css-loader'));

      if (cssLoader) {
        cssLoader.options = {
          ...cssLoader.options,
          modules: {
            ...cssLoader.options.modules,
            exportLocalsConvention: 'camelCaseOnly',
            localIdentName: '[local]__[hash:base64:5]',
          }
        };

        delete cssLoader.options.modules.getLocalIdent;
      }
    }

    return config;
  }
};
