import 'server-only';
import { composeMiddlewares } from './common/models/helpers/middlewares';
import {withI18n} from './app/i18n/middleware';
import { withAuth } from './auth/models/middlewares';

export default composeMiddlewares([withI18n, withAuth])


export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)']
}

