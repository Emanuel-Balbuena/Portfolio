import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = ['en', 'es'];

export default getRequestConfig(async ({ requestLocale }) => {
    // Resolvemos la promesa del idioma (Requisito de Next.js 15+)
    const locale = await requestLocale;

    // Validación de seguridad estricta
    if (!locale || !locales.includes(locale)) {
        notFound();
    }

    return {
        locale,
        messages: (await import(`../messages/${locale}.json`)).default
    };
});