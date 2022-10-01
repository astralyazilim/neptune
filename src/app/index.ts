import { AdapterCore } from "./adapter";
import { NeptuneResource } from "./resource";

export interface INeptunAppOptions {
  adapter?: any & AdapterCore;
  resources?: Array<any & NeptuneResource>;
  hostname?: string;
  port?: number;
  providers?: any[];
}

export enum NeptunMethods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
  HEAD = "HEAD",
  OPTIONS = "OPTIONS",
  TRACE = "TRACE",
  CONNECT = "CONNECT",
  ERROR = "ERROR",
}

export class NeptuneApp {
  constructor(
    public adapter?: any & AdapterCore,
    public resources?: Array<any & NeptuneResource>,
    public hostname?: string,
    public port?: number
  ) {}

  public run(cb?: () => void): this {
    if (this.adapter) {
      this.adapter = new this.adapter(
        this.hostname,
        this.port,
        this.resources,
        []
      );
    } else throw new Error("Not adapter specified");
    return this;
  }

  public stop() {
    (this.adapter as typeof this.adapter & AdapterCore).stop();
  }
}

export function createNeptune(options: INeptunAppOptions) {
  const resources = options.resources?.map((resource) => new resource()) || [];

  return new NeptuneApp(
    options.adapter,
    options.resources,
    options.hostname,
    options.port
  );
}
