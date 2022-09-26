/// <reference types="node" />
/// <reference types="node" />
import { Server, ServerResponse } from "http";
import { Resource } from "./resource";
export interface INeptunAdapterResponse {
    headers: Record<string, string>;
    status: number;
    body: string | Buffer | Uint8Array | undefined;
}
export declare class AdapterCore {
    protected host: string | undefined;
    protected port: string | number;
    protected resources: Array<any & Resource>;
    protected services: [];
    constructor(host?: string | undefined, port?: string | number, resources?: Array<any & Resource>, services?: []);
    protected onRequest(path: string, method: string, request: any): Promise<INeptunAdapterResponse>;
}
export declare type IAdapterNodeRequest = {};
export declare type IAdapterNodeResponse = ServerResponse & {};
export declare class NodeAdapter extends AdapterCore {
    server: Server;
    constructor(host?: string, port?: string | number, resources?: Array<any & Resource>, services?: []);
    stop(): void;
}
//# sourceMappingURL=adapter.d.ts.map