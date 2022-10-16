import type { NeptuneResource } from "../common/neptune_resource";

export const findResource = (
  resources: Array<any & NeptuneResource> = [],
  path: string = "/"
): any & NeptuneResource =>
  resources.find((resource) => {
    return new resource().getRegexpPath(path).find((x: RegExp) => x.test(path));
  });
