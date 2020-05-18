# Scroll Spy in ES6

  It's modified from [gumshoe](https://github.com/cferdinandi/gumshoe/blob/master/src/js/gumshoe/gumshoe.js)

  To support arrow functions and async/await, you should install:

  ```bash
  npm install --save-dev @babel/core
  npm install --save-dev @babel/plugin-proposal-class-properties
  npm install --save-dev @babel/plugin-transform-arrow-functions
  npm install --save-dev @babel/plugin-transform-runtime
  npm install --save-dev @babel/preset-env
  npm install --save-dev babel-loader
  ```

  and then configure a rule in `webpack.config.js`:

  ```js
{
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      plugins: [
        '@babel/plugin-transform-arrow-functions',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-transform-runtime',
      ],
      presets: [
        '@babel/preset-env',
      ]
    },
  }
},
  ```
