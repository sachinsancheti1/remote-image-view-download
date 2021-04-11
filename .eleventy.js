const Image = require('@11ty/eleventy-img');

module.exports = function (eleventyConfig) {
  eleventyConfig.addNunjucksAsyncShortcode(
    'genImages',
    require('./_site/utils/genImages.js')
  );
  eleventyConfig.addLayoutAlias('base', 'base.njk');

  return {
    markdownTemplateEngine: 'njk',
    dir: {
      input: '_site',
      data: '_data',
      includes: '_includes',
      layouts: '_includes/layouts',
      output: 'dist',
    },
  };
};
