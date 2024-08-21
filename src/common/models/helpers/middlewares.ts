import { NextMiddleware, NextResponse } from "next/server";

export type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware;
export function composeMiddlewares(
  middlewares: MiddlewareFactory[] = [],
  index = 0
): NextMiddleware {
  const current = middlewares[index];

  if (current) {
    const next = composeMiddlewares(middlewares, index + 1);
    return current(next);
  }
  return () => NextResponse.next();
}