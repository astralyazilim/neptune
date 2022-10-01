export class NeptuneHeader {
  public headers: Record<string, string> = {};
  protected SetHeaders(value: Record<string, string>): void {
    this.headers = value;
  }

  protected AddHeader(key: string, value: string) {
    this.headers = { ...this.headers, [key]: value };
  }

  protected RemoveHeader(key: string) {
    const { [(key = key)]: value, ...rest } = this.headers;
    this.headers = rest;
  }

  public GetHeaders() {
    return this.headers;
  }
}
