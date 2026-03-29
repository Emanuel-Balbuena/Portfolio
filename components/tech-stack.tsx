import { Code2, Cpu, Database, Layout, Server, ShieldCheck, Terminal } from "lucide-react";
import { useTranslations } from "next-intl";

// Separación de datos: Fácil de escalar y mantener.
const TECHNOLOGIES = [
  { name: "Next.js & React", icon: Code2 },
  { name: "Arch Linux", icon: Terminal },
  { name: "Hyprland", icon: Layout },
  { name: "Sistemas IoT (ESP32)", icon: Cpu },
  { name: "Tailwind CSS", icon: Layout },
  { name: "Arquitectura de Red", icon: Server },
  { name: "Ciberseguridad", icon: ShieldCheck },
  { name: "Bases de Datos", icon: Database },
];

export function TechStack() {
  const t = useTranslations("TechStack");

  return (
    <section className="w-full py-12 border-b border-border overflow-hidden bg-background">
      <div className="container px-4 md:px-6 mx-auto mb-8 text-center">
        <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest">
          {t("heading")}
        </p>
      </div>

      {/* 
        Contenedor principal del Marquee.
        'group group-hover-pause' activa la pausa al pasar el mouse (definida en globals.css).
        'flex flex-nowrap' asegura que los elementos nunca salten a la siguiente línea.
        Añadimos máscaras de gradiente a los lados para que los logos "desaparezcan" suavemente (Estilo Vercel/Stripe).
      */}
      <div className="relative flex overflow-hidden group-hover-pause w-full mask-edges">
        
        {/* Gradientes laterales para efecto de desvanecimiento */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

        {/* 
          El truco del bucle infinito: 
          Renderizamos DOS contenedores idénticos (aria-hidden en el segundo para accesibilidad) 
          que se animan juntos hacia la izquierda.
        */}
        <div className="flex shrink-0 animate-marquee min-w-full items-center justify-around gap-8 px-4">
          {TECHNOLOGIES.map((tech, index) => (
            <div key={`tech-1-${index}`} className="flex items-center gap-2 px-4 py-2 bg-muted/30 border border-border rounded-full backdrop-blur-sm shadow-sm transition-colors hover:bg-muted/60">
              <tech.icon className="size-4 text-muted-foreground" />
              <span className="font-mono text-sm font-medium text-foreground">{tech.name}</span>
            </div>
          ))}
        </div>

        {/* Duplicado exacto */}
        <div className="flex shrink-0 animate-marquee min-w-full items-center justify-around gap-8 px-4" aria-hidden="true">
          {TECHNOLOGIES.map((tech, index) => (
            <div key={`tech-2-${index}`} className="flex items-center gap-2 px-4 py-2 bg-muted/30 border border-border rounded-full backdrop-blur-sm shadow-sm transition-colors hover:bg-muted/60">
              <tech.icon className="size-4 text-muted-foreground" />
              <span className="font-mono text-sm font-medium text-foreground">{tech.name}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}