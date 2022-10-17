

export interface IHasDispatch {
  dispatch(event: string, ...args: any): unknown;
}
