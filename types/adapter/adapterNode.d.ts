/// <reference types="node" />
import { Server, ServerResponse } from "http";
import { NeptuneResource } from "../app/resource";
import { AdapterCore } from "./adapterCore";
export declare type IAdapterNodeRequest = {};
export declare type IAdapterNodeResponse = ServerResponse & {};
export declare class NodeAdapter extends AdapterCore {
    server: Server;
    constructor(host?: string, port?: string | number, resources?: Array<any & NeptuneResource>, services?: []);
    stop(): void;
}
//# sourceMappingURL=adapterNode.d.ts.map