export interface INeptunResponse {
    body: string;
    headers: Record<string, string>;
    status: number;
}
export declare const Response: {
    json<T>(body: Record<string, unknown> | T, status?: number, headers?: Record<string, string>): {
        body: string;
        status: number;
        headers: Record<string, string>;
    };
    redirect(path: string, status: 300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308): {
        status: 300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308;
        headers: {
            location: string;
        };
        body: string;
    };
    text(body: string, status?: number, headers?: Record<string, string>): {
        status: number;
        headers: Record<string, string>;
        body: string;
    };
    null(status?: number, headers?: Record<string, string>): {
        status: number;
        headers: Record<string, string>;
        body: string;
    };
    file(path: string): {
        status: number;
        headers: {};
        body: string;
    };
};
//# sourceMappingURL=neptune_response.d.ts.map