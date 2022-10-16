import { IncomingHttpHeaders, IncomingMessage, ServerResponse } from "http";
import { getBoundary } from "../helpers/get_boundary";
import { Input, Part } from "../misc/form";
import { process } from "./process_body";
export class Form {
  private fields: { name: string; input: Input }[] = [];
  get(name: string): Input | undefined | string {
    const field = this.fields.find((f) => f.name == name)?.input;
    return field?.type ? field : field?.data.toString();
  }
  getAll(name: string): (Input | string)[] | undefined {
    const field = this.fields
      .filter((f) => f.name == name)
      .map((x) => (x.input.type ? x.input : x.input.toString()));
    return field;
  }
  append(name: string, value: Input): this {
    this.fields = [...this.fields, { name, input: value }];
    return this;
  }
}
export class NeptuneRequest {
  constructor(
    public readonly OriginalRequest: IncomingMessage,
    public readonly OriginalResponse: ServerResponse,
    public path: string,
    public headers: IncomingHttpHeaders,
    public locals: Record<string, unknown>
  ) {}
  formData(): Promise<Form> {
    let lastline = "";
    let header = "";
    let info = "";
    let state = 0;
    let buffer: number[] = [];
    let boundary = getBoundary(
      this.OriginalRequest.headers["content-type"] || ""
    );
    const allParts: Input[] = [];

    return new Promise((resolve) => {
      this.OriginalRequest.on("data", (multipartBodyBuffer) => {
        for (let i = 0; i < multipartBodyBuffer.length; i++) {
          const oneByte: number = multipartBodyBuffer[i];
          const prevByte: number | null =
            i > 0 ? multipartBodyBuffer[i - 1] : null;
          const newLineDetected: boolean =
            oneByte === 0x0a && prevByte === 0x0d ? true : false;
          const newLineChar: boolean =
            oneByte === 0x0a || oneByte === 0x0d ? true : false;
          if (!newLineChar) lastline += String.fromCharCode(oneByte);

          if (0 === state && newLineDetected) {
            if ("--" + boundary === lastline) {
              state = 1;
            }
            lastline = "";
          } else if (1 === state && newLineDetected) {
            header = lastline;
            state = 2;
            if (header.indexOf("filename") === -1) {
              state = 3;
            }
            lastline = "";
          } else if (2 === state && newLineDetected) {
            info = lastline;
            state = 3;
            lastline = "";
          } else if (3 === state && newLineDetected) {
            state = 4;
            buffer = [];
            lastline = "";
          } else if (4 === state) {
            if (lastline.length > boundary.length + 4) lastline = "";
            if ("--" + boundary === lastline) {
              const j = buffer.length - lastline.length;
              const part = buffer.slice(0, j - 1);
              const p: Part = { header: header, info: info, part: part };
              allParts.push(process(p));
              buffer = [];
              lastline = "";
              state = 5;
              header = "";
              info = "";
            } else buffer.push(oneByte);

            if (newLineDetected) lastline = "";
          } else if (5 === state) {
            if (newLineDetected) state = 1;
          }
        }
      });
      this.OriginalRequest.on("end", () => {
        const formData: Form = new Form();

        for (const field of allParts)
          formData.append(field.name || "File", field);

        resolve(formData);
      });
    });
  }

  json(): Promise<Record<string, unknown>> {
    return new Response(this.OriginalRequest as unknown as BodyInit, {
      headers: this.OriginalRequest.headers as HeadersInit,
    }).json();
  }

  text(): Promise<string> {
    return new Response(this.OriginalRequest as unknown as BodyInit, {
      headers: this.OriginalRequest.headers as HeadersInit,
    }).text();
  }

  buffer(): Buffer {
    return Buffer.from([]);
  }
}
