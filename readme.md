![Production Build](https://github.com/mmazurowski/account-it-api/workflows/Project%20Build/badge.svg)
![Test](https://github.com/mmazurowski/account-it-api/workflows/Test/badge.svg)
![Lint Check](https://github.com/mmazurowski/account-it-api/workflows/Lint%20Check/badge.svg)

# AccountIT - API

Main goal of the project is to expose API for Accounting SaaS.  
Built with DDD, Clean Architecture and Event Driven Architecture in mind.

## ⚒️ Project requirements

```
1. Node >= 14
2. Docker >= 20.10.7
3. NPM >= 7.20.3
```

## 📚 Documentation

Table of contents

1. [Architecture Guide](docs/architecture.md)
2. [Configuration](docs/configuration.md)
3. [Docker](docs/docker.md)
4. [One Pager](docs/one-page-introduction.md)
5. [Enterprise Bus](docs/enterprise-bus.md)

## 📜 NPM Scripts

1. **start** - Starts compiled application
2. **dev** - Starts Nodemon in watch mode
3. **build** - Builds application using Typescript Compiler
4. **test** - Starts tests
5. **test:ci** - Starts tests (used in CI environment)
6. **test:watch** - Starts local tests in watch mode
7. **lint** - Lints source files
8. **lint:fix** - Lints files and performs fixes
9. **typecheck** - Performs typecheck in source files
10. **prepare** - Husky hook, used internally to maintain GitHooks
