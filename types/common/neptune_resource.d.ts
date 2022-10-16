import { NeptuneHeader } from "../internal";
import { NeptuneRequest } from "../internal/neptune_form";
import { NeptuneError } from "./neptune_error";
import { NeptuneProvider } from "./neptune_provider";
import { IHasService, INeptuneServices } from "./neptune_service";
declare abstract class ResourceBase extends NeptuneHeader implements IHasService {
    private providers;
    private regexpUrls;
    abstract path: string | RegExp | Array<string | RegExp>;
    url: string;
    locals: Record<string, unknown>;
    headers: Record<string, string>;
    protected param(this: ResourceBase, key: string): string;
    protected params(): Record<string, string>;
    getRegexpPath(): RegExp[];
    handleEndpoint(method: string): boolean;
    SetProviders(providers: Record<string, any & NeptuneProvider>): void;
    protected GetProvider(name: string): any;
    private createParams;
    protected getParams: (url: string) => Record<string, string>;
    services: INeptuneServices;
}
export declare class NeptuneResource extends ResourceBase {
    path: string | RegExp | Array<string | RegExp>;
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
export {};
//# sourceMappingURL=neptune_resource.d.ts.map