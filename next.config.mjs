import createNextIntlPlugin from 'next-intl/plugin';
 
// Paréntesis vacíos para que busque automáticamente i18n/request.ts
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  // tu configuración existente...
};
 
export default withNextIntl(nextConfig);