// app/[locale]/layout.tsx
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "../globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

// Nota: Por ahora mantenemos la metadata estática. 
// En el futuro, Next.js permite usar `generateMetadata` para traducirla.
export const metadata = {
  title: "Portafolio | Ciervo",
  description: "Portafolio personal.",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  // 1. Resolvemos las promesas del servidor para el i18n
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html
      lang={locale} // Inyectamos el idioma actual en el HTML
      suppressHydrationWarning
      className={cn(
        "antialiased",
        jakarta.variable,
        jetbrainsMono.variable,
        "font-sans"
      )}
    >
      <body className="min-h-screen bg-background text-foreground">
        {/* LA BURBUJA DE IDIOMAS: Envuelve toda la app */}
        <NextIntlClientProvider messages={messages}>

          {/* LA BURBUJA DE TEMAS: Exactamente como la tenías */}
          <ThemeProvider>
            <Navbar />

            <main className="relative flex min-h-screen w-full flex-col overflow-x-clip">
              {children}
            </main>

            <Footer />
            <Toaster />
          </ThemeProvider>

        </NextIntlClientProvider>
      </body>
    </html>
  );
}