import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from 'next/server';
import 'server-only';
import { MiddlewareFactory } from '~/common/models/helpers/middlewares';
import { getSession } from '../../../app/test/session';

const LANG_PLACEHOLDER = ':lang';

const publicRoutes = [`/${LANG_PLACEHOLDER}/reset`, `/${LANG_PLACEHOLDER}/login`, `/${LANG_PLACEHOLDER}/register`, `/${LANG_PLACEHOLDER}/new-password`];

const withAuth: MiddlewareFactory = (next: NextMiddleware) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const [, requestedLang] = request.nextUrl?.pathname?.split('/')
    const path = request.nextUrl?.pathname?.replace(requestedLang, LANG_PLACEHOLDER);
    if (publicRoutes.includes(path)) {
      return next(request, _next)
    }

    const session = await getSession();
    if (!session) {
      const [, requestedLang] = request.nextUrl?.pathname?.split('/')
      return NextResponse.redirect(new URL(`/${requestedLang}/login`, request.nextUrl))
    }

    return next(request, _next)
  }
}


export default withAuth