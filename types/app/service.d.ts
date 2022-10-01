import { NeptuneRequest } from "../internal/body";
import { NeptuneHeader } from "../internal/header";
export interface INeptuneServices {
    GET?: any & NeptuneService[];
    POST?: any & NeptuneService[];
    PUT?: any & NeptuneService[];
    PATCH?: any & NeptuneService[];
    DELETE?: any & NeptuneService[];
    HEAD?: any & NeptuneService[];
    OPTIONS?: any & NeptuneService[];
    CONNECT?: any & NeptuneService[];
    TRACE?: any & NeptuneService[];
}
export declare abstract class NeptuneService extends NeptuneHeader {
    locals: Record<string, string>;
    abstract methods: string[];
    abstract beforeResource(request?: NeptuneRequest): Promise<Record<string, unknown>> | Record<string, unknown>;
}
//# sourceMappingURL=service.d.ts.map