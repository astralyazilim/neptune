import { NeptunMethods } from "../misc/neptune_methods";
export declare class NeptuneError {
    message: string;
    status: number;
    headers: Record<string, string>;
}
export declare class Neptune404Error extends NeptuneError {
    status: number;
    headers: {};
    constructor(method: NeptunMethods, path: string);
}
//# sourceMappingURL=neptune_error.d.ts.map