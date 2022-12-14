import { createNeptune } from "../../src/app";
import { NodeAdapter } from "../../src/adapter/adapterNode";
import { NeptuneResource } from "../../src/app/resource";
import { NeptuneRequest } from "../../src/internal/body";
import { INeptunResponse, Response } from "../../src/internal/response";
export class TestResource extends NeptuneResource {
  public path = "/user/:id";

  GET(request: NeptuneRequest): INeptunResponse | Promise<INeptunResponse> {
    return Response.json({ user: "jdoe", id: this.param("id") });
  }
}

export class TestResource2 extends NeptuneResource {
  public path = "/user";

  GET(request: NeptuneRequest): INeptunResponse | Promise<INeptunResponse> {
    return Response.json({ user: "jdoe" });
  }
}
export const app = createNeptune({
  adapter: NodeAdapter,
  hostname: "localhost",
  port: 3001,
  resources: [TestResource, TestResource2],
});
