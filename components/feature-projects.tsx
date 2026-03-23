import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

type SystemStatus = "production" | "maintenance" | "paused" | "closed";

const STATUS_CONFIG: Record<SystemStatus, { label: string; className: string }> = {
  production: { 
    label: "En Producción", 
    className: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" 
  },
  maintenance: { 
    label: "Mantenimiento", 
    className: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/20" 
  },
  paused: { 
    label: "Pausado", 
    className: "bg-zinc-500/15 text-zinc-600 dark:text-zinc-400 border-zinc-500/20" 
  },
  closed: { 
    label: "Cerrado", 
    className: "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/20" 
  },
};

const FEATURED_PROJECTS: {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  status: SystemStatus;
  tags: string[];
  href: string;
}[] = [
  {
    id: "powerlink",
    title: "Powerlink IoT Architecture",
    description: "Sistema de monitoreo eléctrico con ESP32 y sensores PZEM-004t. Implementación de medidas de ciberseguridad.",
    imageUrl: "/images/ft-powerlink.png",
    status: "production",
    tags: ["IoT", "Hardware", "Security"],
    href: "/projects/powerlink",
    // Eliminamos 'span' de los datos
  },
  {
    id: "arch-env",
    title: "Arch Linux Setup", // Simplificamos para equilibrio visual
    description: "Entorno de desarrollo de ultra bajo consumo y alta eficiencia. Integración de dotfiles personalizados.",
    imageUrl: "/images/ft-hyprland.png",
    status: "maintenance",
    tags: ["Linux", "SysAdmin", "Scripting"],
    href: "/projects/arch-environment",
  }
];

export function FeaturedProjects() {
  return (
    <section className="w-full py-20 border-b border-border">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="mb-10 flex flex-col gap-2">
          <h2 className="text-3xl font-bold tracking-tight font-sans">Sistemas Destacados</h2>
          <p className="text-muted-foreground font-mono text-sm">
            // Seleccionados por complejidad técnica y arquitectura.
          </p>
        </div>

        {/* 1. Reducción de Escala y Equilibrio (2 items)
          Limitamos el ancho máximo de la rejilla (max-w-7xl mx-auto) 
          y usamos cols-2 en pantallas grandes para balancear con solo 2 items.
          Constraint al Card width para que no se vea 'grande y vacía'.
        */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {FEATURED_PROJECTS.map((project) => {
            const statusInfo = STATUS_CONFIG[project.status];

            return (
              <Link 
                key={project.id} 
                href={project.href}
                className="relative group transition-all"
              >
                {/* 3. Intensificación del Hover (Blue/Orange Glow)
                  Cambiamos opacity de /10 a /25 y ajustamos desenfoque [80px] a [100px] 
                  para que 'brille con fuerza'.
                */}
                <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100">
                  <div className="absolute -top-10 -left-10 w-48 h-48 bg-blue-500/25 rounded-full blur-[100px]" />
                  <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-orange-500/25 rounded-full blur-[100px]" />
                </div>

                {/* Limitamos el ancho máximo de la tarjeta individual (max-w-2xl) 
                  y la centramos (mx-auto lg:mx-0) para reducir su escala visual.
                */}
                <Card className="max-w-2xl mx-auto lg:mx-0 h-full bg-background border-border group-hover:border-foreground/20 transition-all duration-300 shadow-sm overflow-hidden relative pt-0 group-hover:scale-[1.02]">
                  
                  {/* BLOQUE DE IMAGEN (Sin badge de estado) */}
                  <div className="relative aspect-video w-full overflow-hidden border-b border-border">
                    <div className="absolute inset-0 z-10 bg-black/15" />
                    <img
                      src={project.imageUrl}
                      alt={`Visualización de ${project.title}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 brightness-100 dark:brightness-100"
                    />
                  </div>

                  {/* CONTENIDO DE TEXTO
                    2. Reubicación del Status Badge
                    Envolvemos Título y Status en un flex-row para alinearlos.
                  */}
                  <CardHeader className="pt-5 pb-3">
                    <div className="flex justify-between items-start gap-4 mb-1.5">
                      <CardTitle className="font-sans text-xl group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </CardTitle>
                      
                      {/* Status Badge colocado en el 'CardAction' del Header */}
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "flex-shrink-0 font-mono text-xs font-normal border shadow-sm",
                          statusInfo.className
                        )}
                      >
                        {statusInfo.label}
                      </Badge>
                    </div>

                    <CardDescription className="text-base text-muted-foreground leading-relaxed">
                      {project.description}
                    </CardDescription>
                  </CardHeader>

                  {/* CONTENIDO INFERIOR: BADGES DE CATEGORÍA */}
                  <CardContent className="pb-5 pt-0">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="font-mono text-xs font-normal px-2.5 py-0.5">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}

        </div>
      </div>
    </section>
  );
}