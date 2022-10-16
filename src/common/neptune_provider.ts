export enum ProviderType {
  SINGLETON = "singleton",
  TRANSIENT = "transient",
  SCOPED = "scoped",
}

export interface IHasProvider {
  providers: Record<
    string,
    {
      scope: ProviderType;
      name: string;
      instance: any & NeptuneProvider;
    }
  >;
}
export interface INeptuneProviderStack {
  scope: ProviderType;
  instance: any & NeptuneProvider;
}
export abstract class NeptuneProvider {
  scope: ProviderType = ProviderType.SINGLETON;
}
