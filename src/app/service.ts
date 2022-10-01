import { NeptuneRequest } from "../internal/body";
import { NeptuneHeader } from "../internal/header";

export interface INeptuneServices {
  GET?: any & NeptuneService[];
  POST?: any & NeptuneService[];
  PUT?: any & NeptuneService[];
  PATCH?: any & NeptuneService[];
  DELETE?: any & NeptuneService[];
  HEAD?: any & NeptuneService[];
  OPTIONS?: any & NeptuneService[];
  CONNECT?: any & NeptuneService[];
  TRACE?: any & NeptuneService[];
}
export abstract class NeptuneService extends NeptuneHeader {
  public locals: Record<string, string> = {};
  public abstract methods: string[];
  public abstract beforeResource(
    request?: NeptuneRequest
  ): Promise<Record<string, unknown>> | Record<string, unknown>;
}
