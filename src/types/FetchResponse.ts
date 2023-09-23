export type FetchResponseType<T> =
  | {
      status: 'success';
      data: T;
    }
  | { status: 'failed'; message: string };
