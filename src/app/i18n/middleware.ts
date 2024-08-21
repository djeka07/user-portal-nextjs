import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from 'next/server';
import { cookieName, fallbackLng, languages } from './settings';
import acceptLanguage from 'accept-language';
import { MiddlewareFactory } from '~/common/models/helpers/middlewares';
import { cookies } from 'next/headers';

acceptLanguage.languages(languages)

export const withI18n: MiddlewareFactory = (next: NextMiddleware) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    if (request.nextUrl.pathname.indexOf('icon') > -1 || request.nextUrl.pathname.indexOf('chrome') > -1) {
      return next(request, _next)
    }

    const [, requestedLang] = request.nextUrl?.pathname?.split('/')
    const supportedLanguage = languages.some(language => language === requestedLang);
    const cookieLang = request.cookies.get(cookieName)?.value;

    if (supportedLanguage && requestedLang !== cookieLang) {
      const response = NextResponse.redirect(new URL(request.nextUrl.pathname, request.url));
      response.cookies.set(cookieName, requestedLang);
      return response;
    }

  
    if (!supportedLanguage && !request.nextUrl.pathname.startsWith('/_next')) {
      const lang = acceptLanguage.get(request.headers.get('Accept-Language')) || fallbackLng;
      const redirectUrl = request.nextUrl?.pathname?.replace(requestedLang, lang);
      return NextResponse.redirect(new URL(redirectUrl, request.url))
    }
  
    return next(request, _next)
  }
}