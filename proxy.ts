import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    // Declaramos los idiomas directamente aquí como lo teníamos antes
    locales: ['en', 'es'],
    defaultLocale: 'es'
});

export const config = {
    // El matcher robusto para que la navegación funcione perfecta
    matcher: [
        '/((?!api|_next|_vercel|.*\\..*).*)',
        '/',
        '/(es|en)/:path*'
    ]
};