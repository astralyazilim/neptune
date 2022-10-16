export type Input = {
  filename?: string;
  name?: string;
  type: string;
  data: Buffer;
};

export type Part = {
  header: string;
  info: string;
  part: number[];
};
