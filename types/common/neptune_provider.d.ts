export declare enum ProviderType {
    SINGLETON = "singleton",
    TRANSIENT = "transient",
    SCOPED = "scoped"
}
export interface IHasProvider {
    providers: Record<string, {
        scope: ProviderType;
        name: string;
        instance: any & NeptuneProvider;
    }>;
}
export interface INeptuneProviderStack {
    scope: ProviderType;
    instance: any & NeptuneProvider;
}
export declare abstract class NeptuneProvider {
    scope: ProviderType;
}
//# sourceMappingURL=neptune_provider.d.ts.map