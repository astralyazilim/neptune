import { NeptunMethods } from "../misc/neptune_methods";

export class NeptuneError {
  public message: string = "Error";
  public status: number = 500;
  public headers: Record<string, string> = {};
}

export class Neptune404Error extends NeptuneError {
  public status = 404;
  headers = {};
  constructor(method: NeptunMethods, path: string) {
    super();
    this.message = `Cannot ${method} ${path}`;
  }
}
