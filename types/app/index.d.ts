import { AdapterCore } from "./adapter";
import { NeptuneResource } from "./resource";
export interface INeptunAppOptions {
    adapter?: any & AdapterCore;
    resources?: Array<any & NeptuneResource>;
    hostname?: string;
    port?: number;
    providers?: any[];
}
export declare enum NeptunMethods {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE",
    HEAD = "HEAD",
    OPTIONS = "OPTIONS",
    TRACE = "TRACE",
    CONNECT = "CONNECT",
    ERROR = "ERROR"
}
export declare class NeptuneApp {
    adapter?: any;
    resources?: any[] | undefined;
    hostname?: string | undefined;
    port?: number | undefined;
    constructor(adapter?: any, resources?: any[] | undefined, hostname?: string | undefined, port?: number | undefined);
    run(cb?: () => void): this;
    stop(): void;
}
export declare function createNeptune(options: INeptunAppOptions): NeptuneApp;
//# sourceMappingURL=index.d.ts.map