import { app } from "./mock";
import { NeptuneApp } from "../src/app";
import { Resource } from "../src/app/resource";
describe("createNeptune", () => {
  it("should return instance of NepatuneApp", () => {
    expect(app).toBeInstanceOf(NeptuneApp);
  });

  it("should have resources stack", () => {
    expect(app.resources).toBeInstanceOf(Array<any & Resource>);
  });

  it("should have run method", () => {
    expect(app).toHaveProperty("run");
    expect(app.run).toBeInstanceOf(Function);
  });

  it("should have stop method", () => {
    expect(app).toHaveProperty("stop");
    expect(app.stop).toBeInstanceOf(Function);
  });
});
