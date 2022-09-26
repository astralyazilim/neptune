import { AdapterCore } from "./adapter";
import { Resource } from "./resource";
export interface INeptunAppOptions {
    adapter?: typeof AdapterCore;
    resources?: Array<any & Resource>;
    hostname?: string;
    port?: number;
}
export declare class NeptuneApp {
    adapter?: any;
    resources?: any[] | undefined;
    hostname?: string | undefined;
    port?: number | undefined;
    server: unknown;
    constructor(adapter?: any, resources?: any[] | undefined, hostname?: string | undefined, port?: number | undefined);
    run(cb?: () => void): this;
    stop(): void;
}
export declare function createNeptune(options: INeptunAppOptions): NeptuneApp;
//# sourceMappingURL=index.d.ts.map