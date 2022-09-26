export class NeptuneError {
  public message: string = "Error";
  public status: number = 500;
  public headers: Record<string, string> = {};
}
