import "reflect-metadata";
import { injectAll, injectable, autoInjectable, inject } from "tsyringe";
import { createNeptune } from "./app";
import { NodeAdapter } from "./app/adapter";
import { Resource } from "./app/resource";
import { NeptuneError } from "./healpers/error";
import { NeptuneRequest } from "./internal/body";
import { Response } from "./internal/response";

// @autoInjectable()
// class UserNotFoundError extends NeptuneError {
//   override headers: Record<string, string> = {
//     ...this.headers,
//     test: "test",
//   };
//   override message: string = "user not f";
// }

// class UserResource extends Resource {
//   public path = "/"; // regexp path

//   //   constructor(private UserNotFound: UserNotFoundError) {
//   //     super();
//   //   }
//   //   // if given path is regexp must be used to parse params
//   //   // custom params handler
//   //   override params(): Record<string, string> {
//   //     return {
//   //       id: this.url.match(/(?<=\/user\/foo\/)\w+(?=$)/)?.[0] || "",
//   //     };
//   //   }

//   async GET(request: NeptuneRequest) {
//     return Response.json({}, 200, {
//       /** headers */
//     });
//   }

//   public ERROR(error?: NeptuneError) {
//     return Response.json({ message: " user not found" });
//   }

//   public BEFORE = {
//     GET: [],
//   };
// }

// const app = createNeptune({
//   adapter: NodeAdapter,
//   hostname: "localhost",
//   port: 3000,
//   resources: [UserResource],
// });

// app.run();
// app.stop();

export class TestResource extends Resource {
  public path = "/user/:id";

  async GET(request: NeptuneRequest) {
    return Response.json({ user: "jdoe" });
  }
}
export const app = createNeptune({
  adapter: NodeAdapter,
  hostname: "localhost",
  port: 3001,
  resources: [TestResource],
}).run();
