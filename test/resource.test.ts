import { Resource } from "../src/app/resource";
import { findResource } from "../src/internal/findResource";
import { TestResource, app, TestResource2 } from "./mock/index";
describe("Resource", () => {
  beforeAll(async () => {
    app.run();
  });

  it("should have path property", () => {
    expect(new TestResource()).toHaveProperty("path");
  });

  it("should create regexp url from path", () => {
    expect(new TestResource().getRegexpPath()).toEqual(/^\/user\/\w+$/);
  });

  it("should match correct path with regexp", () => {
    expect("/user/1").toMatch(new TestResource().getRegexpPath());
  });

  it("should handle requests", async () => {
    const data = await fetch("http://localhost:3001/user/1").then((data) =>
      data.json()
    );

    expect(data.user).toBe("jdoe");
  });

  it("should handle request params", async () => {
    const data = await fetch("http://localhost:3001/user/1").then((data) =>
      data.json()
    );

    expect(data.id).toBe("1");
  });

  it("should find resource from request url", () => {
    const resource: any & Resource = findResource(
      [TestResource, TestResource2] as Array<any & Resource>,
      "/user"
    );

    expect(new resource()).toBeInstanceOf(TestResource2);
  });

  it("endpoints should run after before hook", () => {
    
  });
  afterAll(() => {
    app.stop();
  });
});
