import { CreateRegexpurl } from "../healpers/createRegexpUrl";
import { NeptuneError } from "../healpers/error";
import { NeptuneRequest } from "../internal/body";

export abstract class Params {
  abstract path: string | RegExp;

  private createParams = () => {
    if (this.path instanceof RegExp) return {};
    const segments = this.path
      .split("/")
      .filter((s) => s !== "")
      .reduce((t, c, i) => {
        if (/^:/.test(c)) return { ...t, [c.replace(/^:/, "")]: i };
        return t;
      }, {});

    return segments;
  };

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
}

export abstract class Resource extends Params {
  public abstract path: string | RegExp;
  public url: string = "/";

  public headers: Record<string, string> = {};

  protected param(this: Resource, key: string): string {
    const params = this.getParams(this.url);

    return params[key];
  }

  protected params(): Record<string, string> {
    if (this.path instanceof RegExp) return {};
    return this.getParams(this.url);
  }

  public getRegexpPath(): RegExp {
    if (this.path instanceof RegExp) return this.path;
    else return CreateRegexpurl(this.path);
  }

  public handleEndpoint(method: string) {
    return this.hasOwnProperty(method.toUpperCase());
  }
  public services?: {
    all?: any[];
    before?: any[];
    after?: any[];
  } | null;

  protected SetHeaders(value: Record<string, string>): void {
    this.headers = value;
  }

  protected AddHeader(key: string, value: string) {
    this.headers = { ...this.headers, [key]: value };
  }

  protected RemoveHeader(key: string) {
    const { [(key = key)]: value, ...rest } = this.headers;
    this.headers = rest;
  }

  public GetHeaders() {
    return this.headers;
  }
  public BEFORE?: { GET?: any[] };
  public GET?(
    request?: NeptuneRequest
  ):
    | { body: string; status: number; headers: Record<string, string> }
    | Promise<{
        body: string;
        status: number;
        headers: Record<string, string>;
      }>;
  public POST?(
    request?: NeptuneRequest
  ):
    | { body: string; status: number; headers: Record<string, string> }
    | Promise<{
        body: string;
        status: number;
        headers: Record<string, string>;
      }>;
  public PUT?(
    request?: any
  ):
    | { body: string; status: number; headers: Record<string, string> }
    | Promise<{
        body: string;
        status: number;
        headers: Record<string, string>;
      }>;
  public PATCH?(
    request?: any
  ):
    | { body: string; status: number; headers: Record<string, string> }
    | Promise<{
        body: string;
        status: number;
        headers: Record<string, string>;
      }>;
  public DELETE?(
    request?: Request
  ):
    | { body: string; status: number; headers: Record<string, string> }
    | Promise<{
        body: string;
        status: number;
        headers: Record<string, string>;
      }>;
  public HEAD?(
    request?: Request
  ):
    | { body: string; status: number; headers: Record<string, string> }
    | Promise<{
        body: string;
        status: number;
        headers: Record<string, string>;
      }>;
  public OPTIONS?(
    request?: Request
  ):
    | { body: string; status: number; headers: Record<string, string> }
    | Promise<{
        body: string;
        status: number;
        headers: Record<string, string>;
      }>;
  public CONNECT?(
    request?: Request
  ):
    | { body: string; status: number; headers: Record<string, string> }
    | Promise<{
        body: string;
        status: number;
        headers: Record<string, string>;
      }>;
  public TRACE?(
    request?: Request
  ):
    | { body: string; status: number; headers: Record<string, string> }
    | Promise<{
        body: string;
        status: number;
        headers: Record<string, string>;
      }>;
  public ERROR?(
    error?: any & NeptuneError
  ):
    | { body: string; status: number; headers: Record<string, string> }
    | Promise<{
        body: string;
        status: number;
        headers: Record<string, string>;
      }>;
}
