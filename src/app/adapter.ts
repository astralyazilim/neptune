import {
  IncomingMessage,
  Server,
  ServerResponse,
  createServer,
  OutgoingHttpHeader,
} from "http";
import { NeptuneError } from "../healpers/error";
import { NeptuneRequest } from "../internal/body";
import { INeptunResponse } from "../internal/response";
import { Resource } from "./resource";

export interface INeptunAdapterResponse {
  headers: Record<string, string>;
  status: number;
  body: string | Buffer | Uint8Array | undefined;
}
export class AdapterCore {
  constructor(
    protected host: string | undefined = undefined,
    protected port: string | number = 3000,
    protected resources: Array<any & Resource> = [],
    protected services: [] = []
  ) {}
  protected async onRequest(
    path: string,
    method: string,
    request: any
  ): Promise<INeptunAdapterResponse> {
    let resource: any & Resource = this.resources.find((resource) =>
      new resource().getRegexpPath().test(path)
    );
    if (!resource) return { body: "", headers: {}, status: 404 };
    else {
      resource = new resource();
      resource.url = path;
      if (method in resource) {
        try {
          const response = await Promise.resolve(
            resource[method](request)
          ).then((response: INeptunResponse) => response);
          response.headers = { ...resource.GetHeaders(), ...response.headers };
          return response;
        } catch (error) {
          if (!("ERROR" in resource))
            return {
              body: (error as NeptuneError).message,
              headers: (error as NeptuneError).headers,
              status: (error as NeptuneError).status,
            };
          else {
            const response = resource.ERROR(error);
            return response;
          }
        }
      } else
        return {
          body: "Can not " + method + " " + path,
          headers: {},
          status: 402,
        };
    }
  }
}

// node spesific adapter request and response type

export type IAdapterNodeRequest = {};
export type IAdapterNodeResponse = ServerResponse & {};

export class NodeAdapter extends AdapterCore {
  server: Server = new Server();
  constructor(
    host?: string,
    port?: string | number,
    resources: Array<any & Resource> = [],
    services: [] = []
  ) {
    super(host, port, resources, services);

    if (this.port) {
      this.server
        .on(
          "request",
          async (request: IncomingMessage, response: ServerResponse) => {
            const path = request.url || "";
            const method = (request.method || "GET").toUpperCase();
            const { headers, body, status } = await this.onRequest(
              path,
              method,
              new NeptuneRequest(request, response, path, request.headers)
            );

            response.writeHead(status || 200, headers).end(body || "");
          }
        )
        .listen({ host: this.host, port: this.port });
    }
  }

  public stop() {
    console.log("close");
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
