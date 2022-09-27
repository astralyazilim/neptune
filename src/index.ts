import "reflect-metadata";
import { injectAll, injectable, autoInjectable, inject } from "tsyringe";
import { createNeptune } from "./app";
import { NodeAdapter } from "./app/adapter";
import { Resource } from "./app/resource";
import { NeptuneError } from "./healpers/error";
import { NeptuneRequest } from "./internal/body";
import { INeptunResponse, Response } from "./internal/response";

export class UserResource extends Resource {
  public path = "/user/:id";

  GET(request: NeptuneRequest): INeptunResponse {
    return Response.json({ user: "jdoe", id: this.param("id") });
  }
}
export const app = createNeptune({
  adapter: NodeAdapter,
  hostname: "localhost",
  port: 3000,
  resources: [UserResource],
}).run();
