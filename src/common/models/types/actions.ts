import { FieldError } from "./field-error"

export type ActionReturn<T = unknown> = {
  errors?: FieldError;
  statusCode?: number;
  data?: T;
}