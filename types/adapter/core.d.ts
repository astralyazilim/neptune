/// <reference types="node" />
import { Resource } from "../app/resource";
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
    protected AdaptRequest(path: string, method: string, request: any): Promise<INeptunAdapterResponse>;
}
//# sourceMappingURL=core.d.ts.map