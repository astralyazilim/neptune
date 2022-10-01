import { NeptuneError } from "../healpers/error";
import { NeptuneRequest } from "../internal/body";
import { NeptuneHeader } from "../internal/header";
import { INeptuneServices } from "./service";
export declare abstract class ResourceBase extends NeptuneHeader {
    abstract path: string | RegExp;
    url: string;
    locals: Record<string, unknown>;
    headers: Record<string, string>;
    protected param(this: ResourceBase, key: string): string;
    protected params(): Record<string, string>;
    getRegexpPath(): RegExp;
    handleEndpoint(method: string): boolean;
    private createParams;
    protected getParams: (url: string) => Record<string, string>;
    services?: INeptuneServices;
}
export declare class NeptuneResource extends ResourceBase {
    path: string | RegExp;
    GET?(request?: NeptuneRequest): {
        body: string;
        status: number;
        headers: Record<string, string>;
    } | Promise<{
        body: string;
        status: number;
        headers: Record<string, string>;
    }>;
    POST?(request?: NeptuneRequest): {
        body: string;
        status: number;
        headers: Record<string, string>;
    } | Promise<{
        body: string;
        status: number;
        headers: Record<string, string>;
    }>;
    PUT?(request?: any): {
        body: string;
        status: number;
        headers: Record<string, string>;
    } | Promise<{
        body: string;
        status: number;
        headers: Record<string, string>;
    }>;
    PATCH?(request?: any): {
        body: string;
        status: number;
        headers: Record<string, string>;
    } | Promise<{
        body: string;
        status: number;
        headers: Record<string, string>;
    }>;
    DELETE?(request?: Request): {
        body: string;
        status: number;
        headers: Record<string, string>;
    } | Promise<{
        body: string;
        status: number;
        headers: Record<string, string>;
    }>;
    HEAD?(request?: Request): {
        body: string;
        status: number;
        headers: Record<string, string>;
    } | Promise<{
        body: string;
        status: number;
        headers: Record<string, string>;
    }>;
    OPTIONS?(request?: Request): {
        body: string;
        status: number;
        headers: Record<string, string>;
    } | Promise<{
        body: string;
        status: number;
        headers: Record<string, string>;
    }>;
    CONNECT?(request?: Request): {
        body: string;
        status: number;
        headers: Record<string, string>;
    } | Promise<{
        body: string;
        status: number;
        headers: Record<string, string>;
    }>;
    TRACE?(request?: Request): {
        body: string;
        status: number;
        headers: Record<string, string>;
    } | Promise<{
        body: string;
        status: number;
        headers: Record<string, string>;
    }>;
    ERROR?(error?: any & NeptuneError): {
        body: string;
        status: number;
        headers: Record<string, string>;
    } | Promise<{
        body: string;
        status: number;
        headers: Record<string, string>;
    }>;
}
//# sourceMappingURL=resource.d.ts.map