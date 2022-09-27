import type { Resource } from "../app/resource";

export const findResource = (
  resources: Array<any & Resource> = [],
  path: string = "/"
): any & Resource =>
  resources.find((resource) => new resource().getRegexpPath(path).test(path));
