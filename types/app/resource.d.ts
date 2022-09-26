import { NeptuneError } from "../healpers/error";
import { NeptuneRequest } from "../internal/body";
export declare abstract class Params {
    abstract path: string | RegExp;
    private createParams;
    protected getParams: (url: string) => Record<string, string>;
}
export declare abstract class Resource extends Params {
    abstract path: string | RegExp;
    url: string;
    headers: Record<string, string>;
    protected param(this: Resource, key: string): string;
    protected params(): Record<string, string>;
    getRegexpPath(): RegExp;
    handleEndpoint(method: string): boolean;
    services?: {
        all?: any[];
        before?: any[];
        after?: any[];
    } | null;
    protected SetHeaders(value: Record<string, string>): void;
    protected AddHeader(key: string, value: string): void;
    protected RemoveHeader(key: string): void;
    GetHeaders(): Record<string, string>;
    BEFORE?: {
        GET?: any[];
    };
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