// node spesific adapter request and response type

import { IncomingMessage, Server, ServerResponse } from "http";
import { NeptuneResource } from "../app/resource";
import { NeptuneRequest } from "../internal/body";
import { AdapterCore } from "./adapterCore";

export type IAdapterNodeRequest = {};
export type IAdapterNodeResponse = ServerResponse & {};

export class NodeAdapter extends AdapterCore {
  server: Server = new Server();
  constructor(
    host?: string,
    port?: string | number,
    resources: Array<any & NeptuneResource> = [],
    services: [] = []
  ) {
    super(host, port, resources, services);

    if (this.port) {
      this.server
        .on(
          "request",
          async (request: IncomingMessage, response: ServerResponse) => {
            const { headers, body, status } = await this.AdaptRequest(
              request.url || "/",
              (request.method || "GET").toUpperCase(),
              new NeptuneRequest(
                request,
                response,
                request.url || "/",
                request.headers,
                {}
              )
            );

            response.writeHead(status || 200, headers).end(body || "");
          }
        )
        .listen({ host: this.host, port: this.port });
    }
  }

  public stop() {
    const onRequest = (request: IncomingMessage, response: ServerResponse) => {
      response.end(); //close the response
      request.socket.end(); //close the socket
      request.socket.destroy; //close it really
      this.server.close(); //close the server
    };

    this.server.on("request", onRequest);

    this.server.close(); //close the server
  }
}
