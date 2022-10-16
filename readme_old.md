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
  public path: "/"; // all resource must have path property

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

hit localhost:3000 in browser; You should be see "Hello world"

Since we only handle GET request in HelloResource. if we request other than GET to path "/" you will get 402 status code

Also neptun can handle GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS,CONNECT, TRACE requests.

# Adapter

Basicaly adapter converting incoming request to neptun request, and Neptune response to platforms response

## NodeAdapter

Neptun comes with nodeadapter built top of NodeJs http server

## Writing custom adapter

Adapters basically a class that extends Neptune.AdapterCore, lets create a basic express adapter

```ts
import { Express } from "express";

class MyAwesomeExpressAdapter extends Neptune.AdapterCore {
  server = Express();
  constructor(
    // we get these paramaters to build own adapter
    host?: string,
    port?: string | number,
    resources: Array<any & Neptune.Resource> = []
    services: any[] = []
  ) {
    // alose parent class need this parameters too
    super(host, port, resources, []) 
    server.use((req, res) => {
        const path = request.url || "" // neptune needs request path and method internally  in
        const method = (request.method || "GET").toUpperCase();


        const { headers, body, status } = await this.onRequest(
              path,
              method,
              new NeptuneRequest(request, response, path, request.headers)
            );
        res.set(headers)
        res.status(status)
        res.end(body)

    }).listen({ host: this.host, port: this.port });
  }
}
```

Now we can use our custom adapter
```ts
const app = Neptune.createApp({
  adapter: MyAwesomeExpressAdapter,
  port: 3000,
  host: "localhost",
  resources: [],
}).run();
```

# LICENSE

MIT
