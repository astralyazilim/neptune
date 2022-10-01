import type { NeptuneResource } from "../app/resource";

export const findResource = (
  resources: Array<any & NeptuneResource> = [],
  path: string = "/"
): any & NeptuneResource =>
  resources.find((resource) => new resource().getRegexpPath(path).test(path));
