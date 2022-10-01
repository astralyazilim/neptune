import { NeptunMethods } from "./app";
import { NeptuneResource } from "./app/resource";
import { NeptuneRequest } from "./internal/body";
import { INeptunResponse } from "./internal/response";
import { NeptuneService } from "./app/service";
declare class IsLoggedInHook extends NeptuneService {
    methods: NeptunMethods[];
    beforeResource(): {
        isLoggedIn: boolean;
    };
}
export declare class UserResource extends NeptuneResource {
    path: string;
    GET(request: NeptuneRequest): INeptunResponse;
    services: {
        GET: (typeof IsLoggedInHook)[];
    };
}
export declare const app: import("./app").NeptuneApp;
export {};
//# sourceMappingURL=index.d.ts.map