# This package is not ready, mentioned parts may not included or tested

# Table of contents

- Getting started
  - About
  - Installation
- Simple neptune app
  - Creating an app
  - listening endpoints
- Adapter
  - NodeAdapter
  - Writing Custom Adapter for serverless platforms
- Resources
  - Methods & Endpoints
  - Error handling
- Services
  - creating a service
  - consuming a service
  - ioc
- Hooks
  - Before
  - After
  - All
- Params
  - params
  - custom param
- Body parsing

  - json
  - text
  - blob
  - form
  - buffer

- Services
- Security
  - csrf
  - helmet
  - cors
- License

# Getting started

## About

Neptun is a strongly typed server library for nodejs and serverless platforms

## installation

npm

```shell
    npm install @astralsoft/neptune
```

yarn

```shell
yarn add @astralsoft/neptune
```

pnpm

```shell
pnpm add @astralsoft/neptune
```

# Simple neptune app

## Create neptune app

```typescript
import Neptune, { NodeAdapter } from "@astralsoft/neptune";
// this will create a neptun app instance
const app = Neptune.createApp({
  adapter: NodeAdapter,
  port: 3000,
  host: "localhost",
  resources: [],
});

// start listening server
app.run();
```

## listening an endpoint

Neptune do not using express like .get() .post() methods and routers. Neptune handle endpoints with Resource classes

hello.resource.ts

```ts
import Neptune from "@astralsoft/neptune";
// this will create a neptun app instance
export class HelloResource extends Neptune.Resource {
  public path: "/";

  public GET(Request: Neptune.Request): Neptune.INeptunResponse {
    return Neptune.Response.text("Hello world", 200);
  }
}
```

app.ts

```ts
import Neptune, { NodeAdapter } from "@astralsoft/neptune";
import { HelloResource } from "./hello.resource";

const app = Neptune.createApp({
  adapter: NodeAdapter,
  port: 3000,
  host: "localhost",
  resources: [HelloResource],
}).run();
```

# LICENSE

MIT
