const rules = require('./webpack.rules');
const path = require('path');

// Rules for CSS files
rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

// Rules for SVG files
rules.push({
  test: /\.svg$/,
  use: ['@svgr/webpack']
});

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules,
  },
  resolve: {
    // Aliases
    alias: {
      '@components': path.resolve(__dirname, 'src/renderer/components'),
      '@styles': path.resolve(__dirname, 'src/renderer/styles'),
      '@pages': path.resolve(__dirname, 'src/renderer/pages'),
    },
  },
};
