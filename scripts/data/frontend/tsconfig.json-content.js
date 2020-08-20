const tsconfigjson = `
{
  "compilerOptions": {
    "outDir": "./dist/",
    "noImplicitAny": true,
    "module": "es6",
    "target": "es5",
    "jsx": "react",
    "sourceMap": true,
    "esModuleInterop": true,
  },
  "include": ["./client/**/*"],
  "exclude": ["node_modules", "**/__tests__/*"]
}
`

module.exports = tsconfigjson;