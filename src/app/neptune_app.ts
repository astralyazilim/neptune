import { IHasProvider, NeptuneProvider } from "../common/neptune_provider";
import { NeptuneResource } from "../common/neptune_resource";
import { NeptuneService } from "../common/neptune_service";
import { NeptuneEvents } from "../internal/neptune_events";
import { AdapterCore } from "./neptune_adapter";

export interface IHasApp {
  app: NeptuneApp;
}

export interface INeptunAppOptions {
  adapter?: any & AdapterCore;
  resources?: Array<any & NeptuneResource>;
  services?: Array<any & NeptuneService>;
  hostname?: string;
  port?: number;
  providers?: Array<any & NeptuneProvider>;
}

export class NeptuneApp extends NeptuneEvents implements IHasProvider {
  public providers: Record<string, any & NeptuneProvider>;
  constructor(
    public adapter?: any & AdapterCore,
    public resources?: Array<any & NeptuneResource>,
    public services?: Array<any & NeptuneService>,
    providers?: Array<any & NeptuneProvider>,
    public hostname?: string,
    public port?: number
  ) {
    super();

    this.providers =
      providers?.reduce<Record<string, any & NeptuneProvider>>(
        (providers, provider) =>
          (providers = { ...providers, [provider.name]: provider }),
        {}
      ) || {};
  }

  public run(cb?: () => void): this {
    if (this.adapter) {
      this.emit("start");
      this.adapter = new this.adapter(this);
    } else throw new Error("Not adapter specified");
    return this;
  }

  public stop() {
    (this.adapter as typeof this.adapter & AdapterCore).stop();
  }
}

export function createNeptune(options: INeptunAppOptions): NeptuneApp {
  const resources = options.resources?.map((resource) => new resource()) || [];

  return new NeptuneApp(
    options.adapter,
    options.resources,
    options.services,
    options.providers,
    options.hostname,
    options.port
  );
}
