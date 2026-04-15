
## Build with 

```sh
tsc && npx esbuild ./src/index.js --bundle --platform=node --outfile=bundle.js && node --build-sea sea-config.json && server.exe
```

## Develop with

```sh
npx nodemon --watch 'src/index.ts' --exec 'tsc && npx esbuild ./src/index.js --bundle --platform=node --outfile=bundle.js && node --build-sea sea-config.json && server.exe'
```
