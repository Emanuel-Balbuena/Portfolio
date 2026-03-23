import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar"; // <-- Importamos nuestro Navbar
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata = {
  title: "Portafolio | Ingeniero en Sistemas",
  description: "Portafolio personal y bitácora técnica.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        jakarta.variable,
        jetbrainsMono.variable,
        "font-sans"
      )}
    >
      <body className="min-h-screen bg-background text-foreground">
        <ThemeProvider>
          {/* Colocamos el Navbar fuera de <main> para que siempre esté arriba */}
          <Navbar />
          <main className="flex flex-col min-h-[calc(100vh-3.5rem)]">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}