const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  // A blueptint for Apostrophe Tailwind CSS module `@apostrophecms/tailwind`.
  // Integration instructions would be:
  // 1. Install the module.
  // 2. Add the `@apostrophecms/tailwind` module to the `modules` section of `app.js`.
  // 3. Add `modules/@apostrophecms/tailwind/ui/src/style.css`
  // with the content as recommended in the Tailwind docs.
  // 4. Add `modules/@apostrophecms/tailwind/ui/src/index.js` wit `import './style.css';`
  // line in it.
  // 5. `npm install tailwindcss autoprefixer && npx tailwindcss init`
  // 6. Configure the `tailwind.config.js` file as you wish.
  //
  // The problem - it conflicts with e.g. vue style loader (different module).
  webpack: {
    extensions: {
      // Integrate Tailwind in Apostrophe public build.
      tailwind: {
        module: {
          rules: [
            {
              test: /\.css$/i,
              include: path.resolve(__dirname, 'ui/src'),
              use: [ 'style-loader', 'css-loader', 'postcss-loader' ]
            }
          ]
        },
        plugins: [
          ...(process.env.APP_ANALYZE === '1'
            ? [ new BundleAnalyzerPlugin() ]
            : []
          )
        ]
      }
    }
  },

  handlers(self) {
    return {
      '@apostrophecms/page:beforeSend': {
        webpack(req) {
          req.data.isDev = (process.env.NODE_ENV !== 'production');
        }
      }
    };
  }
};
