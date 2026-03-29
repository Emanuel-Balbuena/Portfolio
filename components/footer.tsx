// components/footer.tsx

import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="w-full border-t border-border bg-background py-10">
      <div className="container px-4 md:px-6 mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Sección Izquierda: Branding y Copyright */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2 font-mono font-semibold tracking-tighter">
            <span>~/ciervo</span>
          </div>
          <p className="text-sm text-muted-foreground font-sans">
            © {new Date().getFullYear()} {t("copyright")}
          </p>
        </div>

        {/* Sección Derecha: Enlaces Sociales y de Contacto 
            Usamos flexbox para alinear los iconos y transiciones suaves en el hover
        */}
        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/Emanuel-Balbuena"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-muted rounded-md"
            aria-label="GitHub"
          >
            <Github className="size-5" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/emanuel-balbuena-ciervo/"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-blue-500 transition-colors p-2 hover:bg-muted rounded-md"
            aria-label="LinkedIn"
          >
            <Linkedin className="size-5" />
          </Link>
          <Link
            href="mailto:[EMAIL_ADDRESS]"
            className="text-muted-foreground hover:text-orange-500 transition-colors p-2 hover:bg-muted rounded-md"
            aria-label="Correo Electrónico"
          >
            <Mail className="size-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}