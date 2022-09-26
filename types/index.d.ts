import "reflect-metadata";
import { Resource } from "./app/resource";
import { NeptuneRequest } from "./internal/body";
export declare class TestResource extends Resource {
    path: string;
    GET(request: NeptuneRequest): Promise<{
        body: string;
        status: number;
        headers: Record<string, string>;
    }>;
}
export declare const app: import("./app").NeptuneApp;
//# sourceMappingURL=index.d.ts.map