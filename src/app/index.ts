import { AdapterCore } from "./adapter";
import { INeptuneHooks, NeptuneHook } from "./hook";
import { Resource } from "./resource";

export interface INeptunAppOptions {
  adapter?: typeof AdapterCore;
  resources?: Array<any & Resource>;
  hooks?: { before?: NeptuneHook[] };
  hostname?: string;
  port?: number;
}

export class NeptuneApp {
  constructor(
    public adapter?: any & AdapterCore,
    public resources?: Array<any & Resource>,
    public hooks?: INeptuneHooks,
    public hostname?: string,
    public port?: number
  ) {}

  public run(cb?: () => void): this {
    if (this.adapter) {
      this.adapter = new this.adapter(
        this.hostname,
        this.port,
        this.resources,
        this.hooks,
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
    options.hooks,
    options.hostname,
    options.port
  );
}
