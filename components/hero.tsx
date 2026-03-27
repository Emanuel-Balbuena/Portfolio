import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    // CAMBIO AQUÍ: Añadimos pb-20 (móvil) y md:pb-32 (escritorio) para garantizar el "breathing room"
    <section className="relative w-full flex-1 flex flex-col items-center justify-center overflow-hidden border-b border-border pt-14 pb-20 md:pb-32">
      {/* Glow Ambiental */}
      <div className="absolute inset-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-blue-600/15 dark:bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute -top-[20%] -right-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-orange-500/15 dark:bg-orange-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-8 mt-8">
        {/* Badge Técnico */}
        <div className="inline-flex items-center rounded-full border border-border bg-background/50 px-3 py-1 text-sm backdrop-blur-md shadow-sm">
          <span className="font-mono text-blue-500 mr-2">{"<sys>"}</span>
          <span className="font-mono text-muted-foreground">Ingeniería de Sistemas & Frontend</span>
          <span className="font-mono text-orange-500 ml-2">{"</sys>"}</span>
        </div>

        {/* Título Principal */}
        <div className="space-y-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground font-sans">
            Arquitectura y código <br className="hidden md:block" /> con precisión técnica.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-sans leading-relaxed">
            Desarrollo interfaces de alta ingeniería y sistemas escalables.
            Priorizando rendimiento, accesibilidad y diseño bimodal.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 pt-8">
          <Button asChild size="lg" variant="outline" className="h-12 px-8 bg-background/50 backdrop-blur-sm border-border">
            <Link href="/projects">
              Explorar Proyectos
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}