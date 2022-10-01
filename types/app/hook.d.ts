import { NeptuneRequest } from "../internal/body";
export declare abstract class NeptuneHook {
    locals: Record<string, string>;
    abstract methods: string[];
    abstract HANDLE(request?: NeptuneRequest): Promise<Record<string, unknown>> | Record<string, unknown>;
}
//# sourceMappingURL=hook.d.ts.map