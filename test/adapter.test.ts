import { createServer } from "http";
import { AdapterCore } from "../src/app/adapter";
import { NeptuneRequest } from "../src/internal/body";
import { TestResource } from "./mock";
const server = createServer();
describe("adapter core", () => {
  beforeAll(() => {
    server.listen(3001);
  });
  it("should adapt requests", async () => {
    const path = "/";
    const method = "GET";
    fetch("http://localhost:3001/user/1");

    class TestAdapter extends AdapterCore {
      constructor() {
        super("localhost", 3001, [TestResource], {}, []);
        server.on("request", async (req, res) => {
          const response = await this.AdaptRequest(
            path,
            method,
            new NeptuneRequest(req, res, path, req.headers)
          );

          expect(response).toBe({
            body: { user: "jdoe", id: "1" },
            status: 200,
            headers: {},
          });
        });
      }
    }
  });
});
