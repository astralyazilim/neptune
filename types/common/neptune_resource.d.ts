import { IHasApp, NeptuneApp } from "../app/neptune_app";
import { NeptuneHeader } from "../internal";
import { IHasDispatch } from "../internal/event_dispatcher";
import { NeptuneRequest } from "../internal/neptune_form";
import { NeptuneError } from "./neptune_error";
import { NeptuneProvider } from "./neptune_provider";
import { IHasService, INeptuneServices } from "./neptune_service";
declare abstract class ResourceBase extends NeptuneHeader implements IHasService, IHasDispatch, IHasApp {
    app: NeptuneApp;
    constructor(app: NeptuneApp);
    abstract dispatch(event: string, ...args: any[]): void;
    abstract path: string | RegExp | Array<string | RegExp>;
    private providers;
    private regexpUrls;
    url: string;
    locals: Record<string, unknown>;
    headers: Record<string, string>;
    services: INeptuneServices;
    protected param(this: ResourceBase, key: string): string;
    protected params(): Record<string, string>;
    getRegexpPath(): RegExp[];
    handleEndpoint(method: string): boolean;
    SetProviders(providers: Record<string, any & NeptuneProvider>): void;
    protected GetProvider(name: string): any;
    private createParams;
    protected getParams: (url: string) => Record<string, string>;
}
export declare class NeptuneResource extends ResourceBase {
    dispatch(event: string, ...args: any): unknown;
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
    PUT?(request?: NeptuneRequest): {
        body: string;
        status: number;
        headers: Record<string, string>;
    } | Promise<{
        body: string;
        status: number;
        headers: Record<string, string>;
    }>;
    PATCH?(request?: NeptuneRequest): {
        body: string;
        status: number;
        headers: Record<string, string>;
    } | Promise<{
        body: string;
        status: number;
        headers: Record<string, string>;
    }>;
    DELETE?(request?: NeptuneRequest): {
        body: string;
        status: number;
        headers: Record<string, string>;
    } | Promise<{
        body: string;
        status: number;
        headers: Record<string, string>;
    }>;
    HEAD?(request?: NeptuneRequest): {
        body: string;
        status: number;
        headers: Record<string, string>;
    } | Promise<{
        body: string;
        status: number;
        headers: Record<string, string>;
    }>;
    OPTIONS?(request?: NeptuneRequest): {
        body: string;
        status: number;
        headers: Record<string, string>;
    } | Promise<{
        body: string;
        status: number;
        headers: Record<string, string>;
    }>;
    CONNECT?(request?: NeptuneRequest): {
        body: string;
        status: number;
        headers: Record<string, string>;
    } | Promise<{
        body: string;
        status: number;
        headers: Record<string, string>;
    }>;
    TRACE?(request?: NeptuneRequest): {
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