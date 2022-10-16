export interface INeptunResponse {
  body: string;
  headers: Record<string, string>;
  status: number;
}

export const Response = {
  json<T>(
    body: T | Record<string, unknown>,
    status?: number,
    headers?: Record<string, string>
  ) {
    return {
      body: JSON.stringify(body, null, 2),
      status: status || 200,
      headers: headers || {},
    };
  },
  redirect(
    path: string,
    status: 300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308
  ) {
    return {
      status: status,
      headers: {
        location: path,
      },
      body: "",
    };
  },
  text(body: string, status?: number, headers?: Record<string, string>) {
    return {
      status: status || 200,
      headers: headers || {},
      body,
    };
  },

  null(status?: number, headers?: Record<string, string>) {
    return {
      status: status || 200,
      headers: headers || {},
      body: "",
    };
  },
  file(path: string) {
    return {
      status: 200,
      headers: {},
      body: "",
    };
  },
};
