import { IncomingMessage, Server, ServerResponse } from "http";
import { NeptuneError } from "../common/neptune_error";
import { ProviderType } from "../common/neptune_provider";
import { NeptuneResource } from "../common/neptune_resource";
import { INeptunResponse } from "../common/neptune_response";
import { NeptuneService } from "../common/neptune_service";
import { findResource } from "../internal/find_resource";
import { NeptuneRequest } from "../internal/neptune_form";
import { IHasApp, NeptuneApp } from "./neptune_app";

export interface INeptunAdapterResponse {
  headers: Record<string, string>;
  status: number;
  body: string | Buffer | Uint8Array | undefined;
}

export class AdapterCore implements IHasApp {
  constructor(public app: NeptuneApp) {
    console.log("Adapter initialized");
    const { providers } = app;
    for (const [name, instance] of Object.entries(this.app.providers)) {
      const providerInstance = new instance();

      if (providerInstance.scope == ProviderType.SINGLETON)
        providers[name] = {
          name,
          scope: ProviderType.SINGLETON,
          instance: providerInstance,
        };
      else
        this.app.providers[name] = {
          name,
          scope: providerInstance.scope,
          instance: instance,
        };
    }
  }
  protected async AdaptRequest(
    path: string,
    method: string,
    request: any
  ): Promise<INeptunAdapterResponse> {
    let resource: any & NeptuneResource = findResource(
      this.app.resources,
      path
    );

    const scopedOrTransient = Object.values(this.app.providers)
      .filter((x) => x.scope != ProviderType.SINGLETON)
      .reduce(
        (total, current) => ({
          ...total,
          [current.name]: {
            ...current,
            instance:
              current.scope == ProviderType.SCOPED
                ? new current.instance()
                : current.instance,
          },
        }),
        {}
      );

    if (!resource) {
      return {
        body: "Can not " + method + " " + path,
        headers: {},
        status: 404,
      };
    } else {
      resource = new resource();
      resource.SetProviders({ ...this.app.providers, ...scopedOrTransient });
      resource.url = path;
      if (method in resource) {
        try {
          if (method in resource.services) {
            const services = resource.services[method];
            services.forEach((service: any & NeptuneService) => {
              service = new service();
              service.SetProviders({
                ...this.app.providers,
                ...scopedOrTransient,
              });
              service.locals = { ...resource.locals };
              if ("beforeResource" in service) {
                resource.locals = {
                  ...resource.locals,
                  ...service.beforeResource(request),
                };
                resource.headers = {
                  ...resource.GetHeaders(),
                  ...service.GetHeaders(),
                };
              }
            });
          }
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
        } finally {
          let serviceLocals: Record<string, unknown> = { ...resource.locals };
          if (method in resource.services) {
            const services = resource.services[method];
            services.forEach((service: any & NeptuneService) => {
              service = new service();
              service.locals = { ...resource.locals };
              if ("afterResource" in service) {
                resource.locals = {
                  ...serviceLocals,
                  ...service.beforeResource(request),
                };
              }
            });
          }
        }
      } else
        return {
          body: "Can not " + method + " " + path,
          headers: {},
          status: 404,
        };
    }
  }
}

export type IAdapterNodeRequest = {};
export type IAdapterNodeResponse = ServerResponse & {};

export class NodeAdapter extends AdapterCore {
  server: Server = new Server();
  constructor(app: NeptuneApp) {
    super(app);
    const { port, hostname: host } = app;

    if (port) {
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
        .listen({ host, port });
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
