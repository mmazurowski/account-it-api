# Architecture

Application consists of shared kernel and modules.

![Clean architecture diagram](https://miro.medium.com/max/1400/1*0R0r00uF1RyRFxkxo3HVDg.png 'Clean architecture diagram')

**Shared**  
This modules is responsible for application bootstrapping and configuration of global functionalities  
such as Dependency Injection, modules registration, DB connection, etc.

**Modules**  
This places serves functionality to register application modules (which should be pluggable)

## Module description

Application consists modules that are placed in:

```
src
--/modules/**
```

Each module should reflect following structure:

```
/module-name
---/submodule-A/
-----/adapters/
-------/graphql
-------/rest
-------/event-bus
-----/application/
-------/commands
-------/queries
-----/core/
-------/events
-------/rules
-------/services
------ module.aggregate-root.ts
------ module.aggregate.root-spec.ts
------ module.repository.ts
-----/infrastructure/
--/submodule-B/**
...
```

**Adapters**  
This directory should contain everything that connects application to the outside world.

1. Inside REST you should have your HTTP actions and controller.
2. Inside GRAPHQL you should have your resolvers, types and args.
3. Inside EventBus you should have your adapters for enterprise bus.
4. Inside Queue you should have your adapters for queue processing (for example sending emails).

**Application**  
This directory contains your CQRS commands and handlers.

**Core**  
This directory contains your DDD building blocks. Aggregates, entities, value objects, repositories, services and everything around Business Logic.
This should be guarded by abstraction with use of interfaces. Concrete implementations should be placed in infrastructure directory.

**Infrastructure**  
This directory should contain all interfaces implementations from **Core** as well as database and views implementation specifics.
