# PokeSG

### Stack
- node v14.19.3
- jest v6.14.17

Clone the repository and run the following command:
```
$ npm install
```

Other available commands

```
$ npm run build

> pokesg@1.0.0 build <path>
> tsc
```

```
$ npm run start

> pokesg@1.0.0 start <path>
> node dist/main.js 0 10

Average height: 10.50
Average weight: 357.80
Execution time: 597.384ms
```

```
$ npm run test                                                

> pokesg@1.0.0 test <path>
> jest

ts-jest[config] (WARN) message TS151001: If you have issues related to imports, you should consider setting `esModuleInterop` to `true` in your TypeScript configuration file (usually `tsconfig.json`). See https://blogs.msdn.microsof
t.com/typescript/2018/01/31/announcing-typescript-2-7/#easier-ecmascript-module-interoperability for more information.
 PASS  tests/index.test.ts

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        2.148 s, estimated 3 s

```

In case you want to customize your command to change the offset or limit you will need to run the original command using `node`. Examples:

```
$ node dist/main.js
The required arguments were not passed. Please use the following command: node main.js <offset> <limit>

$ node dist/main.js 10 25
Average height: 9.32
Average weight: 220.92
Execution time: 1305.610ms

$ node .\dist\main.js 10 40
Average height: 9.18
Average weight: 203.22
Execution time: 1108.259ms
```