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
export declare class NeptuneApp extends NeptuneEvents implements IHasProvider {
    adapter?: any;
    resources?: any[] | undefined;
    services?: any[] | undefined;
    hostname?: string | undefined;
    port?: number | undefined;
    providers: Record<string, any & NeptuneProvider>;
    constructor(adapter?: any, resources?: any[] | undefined, services?: any[] | undefined, providers?: Array<any & NeptuneProvider>, hostname?: string | undefined, port?: number | undefined);
    run(cb?: () => void): this;
    stop(): void;
}
export declare function createNeptune(options: INeptunAppOptions): NeptuneApp;
//# sourceMappingURL=neptune_app.d.ts.map