/// <reference types="node" />
/// <reference types="node" />
import { IncomingHttpHeaders, IncomingMessage, ServerResponse } from "http";
declare type Input = {
    filename?: string;
    name?: string;
    type: string;
    data: Buffer;
};
export declare function getBoundary(header: string): string;
export declare class Form {
    private fields;
    get(name: string): Input | undefined | string;
    getAll(name: string): (Input | string)[] | undefined;
    append(name: string, value: Input): this;
}
export declare class NeptuneRequest {
    readonly OriginalRequest: IncomingMessage;
    readonly OriginalResponse: ServerResponse;
    path: string;
    headers: IncomingHttpHeaders;
    locals: Record<string, unknown>;
    constructor(OriginalRequest: IncomingMessage, OriginalResponse: ServerResponse, path: string, headers: IncomingHttpHeaders, locals: Record<string, unknown>);
    formData(): Promise<Form>;
    json(): Promise<Record<string, unknown>>;
    text(): Promise<string>;
    buffer(): Buffer;
}
export {};
//# sourceMappingURL=body.d.ts.map