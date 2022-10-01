import { createNeptune, NeptunMethods } from "./app";
import { NodeAdapter } from "./adapter/adapterNode";
import { NeptuneResource } from "./app/resource";
import { NeptuneError } from "./healpers/error";
import { NeptuneRequest } from "./internal/body";
import { INeptunResponse, Response } from "./internal/response";
import { NeptuneService, INeptuneServices } from "./app/service";
import { NeptuneProvider } from "./app/provider";

// dummy userprovider
class UserProvider extends NeptuneProvider {
  private users = ["jdoe", "mdoe", "bdoe"];
  getUserById(id: number) {
    this.users[id];
  }
}
class IsLoggedInHook extends NeptuneService {
  public methods = [NeptunMethods.GET];
  beforeResource() {
    this.SetHeaders({ "x-potato": "kumpir" });
    return { isLoggedIn: false };
  }
}

class UserNotLoggedInError extends NeptuneError {
  public status = 401;
  public message: string = "You need to login perfom this action";
}

export class UserResource extends NeptuneResource {
  public path = "/user/:id";

  GET(request: NeptuneRequest): INeptunResponse {
    if (!this.locals.isLoggedIn) throw new UserNotLoggedInError();
    return Response.json({
      user: "jdoe",
      id: this.UserProvider.getUserById(Number(this.param("id"))),
      isLoggedIn: this.locals.isLoggedIn,
    });
  }

  services = { GET: [IsLoggedInHook] };
}

export const app = createNeptune({
  adapter: NodeAdapter,
  hostname: "localhost",
  port: 3000,
  resources: [UserResource],
  providers: [UserProvider], // todo
}).run();
