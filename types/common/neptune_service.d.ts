import { NeptuneHeader } from "../internal";
import { NeptuneRequest } from "../internal/neptune_form";
import { NeptuneProvider } from "./neptune_provider";
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
export declare abstract class NeptuneService extends NeptuneHeader {
    private providers;
    locals: Record<string, string>;
    abstract beforeResource(request?: NeptuneRequest): Promise<Record<string, unknown>> | Record<string, unknown>;
    SetProviders(providers: Record<string, any & NeptuneProvider>): void;
    protected GetProvider(name: string): any;
}
//# sourceMappingURL=neptune_service.d.ts.map