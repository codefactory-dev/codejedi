//webpack config: 
module: {
    loaders: [
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader'],
      }
    ]
  }