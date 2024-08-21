export type FetchState = 'pending' | 'repending' | 'ready' | 'errored' | 'initial';

export type ProgressState<T> = {
  state: FetchState;
  data?: T;
  error?: unknown;
};
