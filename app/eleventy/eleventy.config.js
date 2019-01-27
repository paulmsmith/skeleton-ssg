const nunjucksEnv = require('./nunjucks.environment');
const config = require('../app.config');

module.exports = eleventyConfig => {
  /** make eleventy use my customer nunjucks 'environment' */
  eleventyConfig.setLibrary('njk', nunjucksEnv);

  eleventyConfig.addNunjucksFilter('__getGlobal', key => {
    return nunjucksEnv.getGlobal(key);
  });

  eleventyConfig.addNunjucksFilter('__setGlobal', (v, k) => {
    nunjucksEnv.addGlobal(k, v);
  });

  return {
    dir: {
      // where are the files eleventy is to process
      input: config.paths.templatesDir,

      // where should eleventy put the rendered pages
      output: `${config.paths.distDir}`,

      // where within the input path are the includes?
      // (macros, partials/includes, layouts)
      includes: `_templates`
    },
    templateFormats: ['njk', 'md'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk'
  };
};
