import { CreateRegexpurl } from "../helpers/create_regexp_url";
import { NeptuneHeader } from "../internal";
import { NeptuneRequest } from "../internal/neptune_form";
import { NeptuneError } from "./neptune_error";
import { NeptuneProvider, ProviderType } from "./neptune_provider";
import { IHasService, INeptuneServices } from "./neptune_service";

abstract class ResourceBase extends NeptuneHeader implements IHasService {
  private providers: Record<string, any & NeptuneProvider> = {};
  private regexpUrls: Array<RegExp> = [];
  public abstract path: string | RegExp | Array<string | RegExp>;
  public url: string = "/";
  public locals: Record<string, unknown> = {};
  public headers: Record<string, string> = {};

  protected param(this: ResourceBase, key: string): string {
    const params = this.getParams(this.url);

    return params[key];
  }

  protected params(): Record<string, string> {
    if (this.path instanceof RegExp) return {};
    return this.getParams(this.url);
  }

  public getRegexpPath(): RegExp[] {
    if (this.path instanceof Array<RegExp | string>) {
      return this.path.map((path) =>
        path instanceof RegExp ? path : CreateRegexpurl(path)
      );
    } else {
      if (this.path instanceof RegExp) return [this.path];
      else return [CreateRegexpurl(this.path)];
    }
  }

  public handleEndpoint(method: string) {
    return this.hasOwnProperty(method.toUpperCase());
  }

  public SetProviders(providers: Record<string, any & NeptuneProvider>) {
    this.providers = providers;
  }
  protected GetProvider(name: string) {
    const instance = this.providers[name];
    if (instance.scope == ProviderType.SINGLETON) return instance.instance;
    else if (instance.scope == ProviderType.SCOPED) return instance.instance;
    else return new instance.instance();
  }
  // parse params
  private createParams = () => {
    if (this.path instanceof RegExp) return {};
    else if (this.path instanceof Array<string | RegExp>)
      return (
        (this.path.find(
          (x) =>
            (typeof x == "string" && CreateRegexpurl(x).test(this.url)) || "/"
        ) || "/") as string
      )
        .split("/")
        .filter((s) => s !== "")
        .reduce((t, c, i) => {
          if (/^:/.test(c)) return { ...t, [c.replace(/^:/, "")]: i };
          return t;
        }, {});
    else
      return this.path
        .split("/")
        .filter((s) => s !== "")
        .reduce((t, c, i) => {
          if (/^:/.test(c)) return { ...t, [c.replace(/^:/, "")]: i };
          return t;
        }, {});
  };
  // get params
  protected getParams = (url: string): Record<string, string> => {
    let param: any[] = url.replace(/\/?\?.*/g, "").split("/");

    param.shift();
    const d = Object.entries(this.createParams() as Record<string, string>)
      .map((p: [string, string]) => {
        return { [p[0]]: param[Number(p[1])] };
      })
      .reduce(
        (t: Record<string, string>, c: Record<string, string>) => ({
          ...t,
          ...c,
        }),
        {}
      );
    return d;
  };

  public services: INeptuneServices = {};
}

export class NeptuneResource extends ResourceBase {
  public path: string | RegExp | Array<string | RegExp> = "/";
  public GET?(request?: NeptuneRequest):
    | { body: string; status: number; headers: Record<string, string> }
    | Promise<{
        body: string;
        status: number;
        headers: Record<string, string>;
      }>;
  public POST?(request?: NeptuneRequest):
    | { body: string; status: number; headers: Record<string, string> }
    | Promise<{
        body: string;
        status: number;
        headers: Record<string, string>;
      }>;
  public PUT?(request?: any):
    | { body: string; status: number; headers: Record<string, string> }
    | Promise<{
        body: string;
        status: number;
        headers: Record<string, string>;
      }>;
  public PATCH?(request?: any):
    | { body: string; status: number; headers: Record<string, string> }
    | Promise<{
        body: string;
        status: number;
        headers: Record<string, string>;
      }>;
  public DELETE?(request?: Request):
    | { body: string; status: number; headers: Record<string, string> }
    | Promise<{
        body: string;
        status: number;
        headers: Record<string, string>;
      }>;
  public HEAD?(request?: Request):
    | { body: string; status: number; headers: Record<string, string> }
    | Promise<{
        body: string;
        status: number;
        headers: Record<string, string>;
      }>;
  public OPTIONS?(request?: Request):
    | { body: string; status: number; headers: Record<string, string> }
    | Promise<{
        body: string;
        status: number;
        headers: Record<string, string>;
      }>;
  public CONNECT?(request?: Request):
    | { body: string; status: number; headers: Record<string, string> }
    | Promise<{
        body: string;
        status: number;
        headers: Record<string, string>;
      }>;
  public TRACE?(request?: Request):
    | { body: string; status: number; headers: Record<string, string> }
    | Promise<{
        body: string;
        status: number;
        headers: Record<string, string>;
      }>;
  public ERROR?(error?: any & NeptuneError):
    | { body: string; status: number; headers: Record<string, string> }
    | Promise<{
        body: string;
        status: number;
        headers: Record<string, string>;
      }>;
}
