import { Input, Part } from "../misc/form";

export function process(part: Part): Input {
  const obj = function (str: string) {
    const k = str.split("=");
    const a = k[0].trim();

    const b = JSON.parse(k[1].trim());
    const o = {};
    Object.defineProperty(o, a, {
      value: b,
      writable: true,
      enumerable: true,
      configurable: true,
    });
    return o;
  };
  const header = part.header.split(";");

  const filenameData = header[2];
  let input = {};
  if (filenameData) {
    input = obj(filenameData);
    const contentType = part.info.split(":")[1].trim();

    Object.defineProperties(input, {
      type: {
        value: contentType,
        writable: true,
        enumerable: true,
        configurable: true,
      },
      name: {
        value: header[1].split("=")[1].replace(/"/g, ""),
        writable: true,
        enumerable: true,
        configurable: true,
      },
    });
  } else {
    Object.defineProperty(input, "name", {
      value: header[1].split("=")[1].replace(/"/g, ""),
      writable: true,
      enumerable: true,
      configurable: true,
    });
  }

  Object.defineProperty(input, "data", {
    value: Buffer.from(part.part),
    writable: true,
    enumerable: true,
    configurable: true,
  });
  return input as Input;
}
