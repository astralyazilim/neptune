/// <reference types="node" />
/// <reference types="node" />
import { Server, ServerResponse } from "http";
import { IHasApp, NeptuneApp } from "./neptune_app";
export interface INeptunAdapterResponse {
    headers: Record<string, string>;
    status: number;
    body: string | Buffer | Uint8Array | undefined;
}
export declare class AdapterCore implements IHasApp {
    app: NeptuneApp;
    constructor(app: NeptuneApp);
    protected AdaptRequest(path: string, method: string, request: any): Promise<INeptunAdapterResponse>;
}
export declare type IAdapterNodeRequest = {};
export declare type IAdapterNodeResponse = ServerResponse & {};
export declare class NodeAdapter extends AdapterCore {
    server: Server;
    constructor(app: NeptuneApp);
    stop(): void;
}
//# sourceMappingURL=neptune_adapter.d.ts.map