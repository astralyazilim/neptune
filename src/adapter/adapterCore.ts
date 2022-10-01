import { NeptuneError } from "../healpers/error";
import { NeptuneRequest } from "../internal/body";
import { INeptunResponse } from "../internal/response";
import { NeptuneResource } from "../app/resource";
import { findResource } from "../internal/findResource";
import { NeptunMethods } from "../app";
import { NeptuneService, INeptuneServices } from "../app/service";
export interface INeptunAdapterResponse {
  headers: Record<string, string>;
  status: number;
  body: string | Buffer | Uint8Array | undefined;
}

export class AdapterCore {
  constructor(
    protected host: string | undefined = undefined,
    protected port: string | number = 3000,
    protected resources: Array<any & NeptuneResource> = [],
    protected services: [] = []
  ) {}
  protected async AdaptRequest(
    path: string,
    method: string,
    request: any
  ): Promise<INeptunAdapterResponse> {
    let resource: any & NeptuneResource = findResource(this.resources, path);
    if (!resource) return { body: "", headers: {}, status: 404 };
    else {
      resource = new resource();
      resource.url = path;
      if (method in resource) {
        try {
          if (method in resource.services) {
            const services = resource.services[method];
            services.forEach((service: any & NeptuneService) => {
              service = new service();
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
          status: 402,
        };
    }
  }
}
