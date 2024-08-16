import qs, { ParsedQs, IStringifyOptions } from 'qs';

export const createQueryParams = (obj: unknown, options?: IStringifyOptions): string =>
  !obj ? '' : qs.stringify(obj, options);

export const getQueryParams = (query: string): ParsedQs => (!query ? {} : qs.parse(query));
