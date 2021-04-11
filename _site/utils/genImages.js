const Image = require('@11ty/eleventy-img');

module.exports = async (src, alt) => {
  if (alt === undefined) {
    // You bet we throw an error on missing alt (alt="" works okay)
    throw new Error(`Missing \`alt\` on genImages from: ${src}`);
  }
  if (process.env.ELEVENTY_ENV === 'production') {
    const sizes = '(max-width: 360px) 340px, 100vw';
    try {
      var pattern = /https/;
      const srcn = pattern.test(src) ? `${src}` : `./_site${src}`;
      const formats = ['webp', 'jpg'];
      const widths = [340, null];
      let stats = await Image(srcn, {
        widths: widths,
        formats: formats,
        urlPath: '/images/',
        outputDir: 'dist/images/',
        cacheOptions: {
          duration: '365d',
          directory: '.cache',
          removeUrlQueryParams: false,
        },
      });
      // console.log(stats);
      let defaultSrc = stats['jpg'][1];
      // Iterate over formats and widths
      return `<picture>
      ${Object.values(stats)
        .map((imageFormat) => {
          return `  <source type="image/${imageFormat[0].format}" srcset="${imageFormat
            .map((entry) => `${entry.url} ${entry.width}w`)
            .join(', ')}" sizes="${sizes}">`;
        })
        .join('\n')}
        <img
          alt="${alt}"
          src="${defaultSrc.url}"
          width="${defaultSrc.width}"
          height="${defaultSrc.height}"
          loading="lazy">
      </picture>`;
    } catch (err) {
      console.error('genImages: eleventy-img error:', err, src);

      // load empty img src (as placeholder)
      return `<img src="${src}" alt="${alt}" loading="lazy">`;
    }
  } else {
    return `<img src="${src}" alt="${alt}" loading="lazy">`;
  }
};
