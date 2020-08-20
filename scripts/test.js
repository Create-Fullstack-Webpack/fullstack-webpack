let obj = `{
  mode: process.env.NODE_ENV,
  entry: [
    path.resolve(process.cwd(), './client/src/index.js'),
  ],
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  }
},`

console.log(obj);
