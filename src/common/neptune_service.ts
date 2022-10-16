import { NeptuneHeader } from "../internal";
import { NeptuneRequest } from "../internal/neptune_form";
import { NeptuneProvider, ProviderType } from "./neptune_provider";

export interface INeptuneServices {
  GET?: (any & NeptuneService)[];
  POST?: any & NeptuneService[];
  PUT?: any & NeptuneService[];
  PATCH?: any & NeptuneService[];
  DELETE?: any & NeptuneService[];
  HEAD?: any & NeptuneService[];
  OPTIONS?: any & NeptuneService[];
  CONNECT?: any & NeptuneService[];
  TRACE?: any & NeptuneService[];
}

export interface IHasService {
  services: {
    GET?: any & NeptuneService[];
    POST?: any & NeptuneService[];
    PUT?: any & NeptuneService[];
    PATCH?: any & NeptuneService[];
    DELETE?: any & NeptuneService[];
    HEAD?: any & NeptuneService[];
    OPTIONS?: any & NeptuneService[];
    CONNECT?: any & NeptuneService[];
    TRACE?: any & NeptuneService[];
  };
}

export abstract class NeptuneService extends NeptuneHeader {
  private providers: Record<string, any & NeptuneProvider> = {};
  public locals: Record<string, string> = {};
  public abstract beforeResource(
    request?: NeptuneRequest
  ): Promise<Record<string, unknown>> | Record<string, unknown>;
  public SetProviders(providers: Record<string, any & NeptuneProvider>) {
    this.providers = providers;
  }

  protected GetProvider(name: string) {
    const instance = this.providers[name];
    if (
      instance.scope == ProviderType.SINGLETON ||
      instance.scope == ProviderType.SCOPED
    )
      return instance.instance;

    return new instance.instance();
  }
}
