import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
// Importamos nuestros datos y tipos centralizados
import { PROJECTS, SystemStatus } from "@/lib/projects";

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

export function FeaturedProjects() {
  // Filtramos dinámicamente solo los proyectos destacados
  const featuredProjects = PROJECTS.filter(project => project.featured);

  return (
    <section className="w-full py-20 border-b border-border">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="mb-10 flex flex-col gap-2">
          <h2 className="text-3xl font-bold tracking-tight font-sans">Sistemas Destacados</h2>
          <p className="text-muted-foreground font-mono text-sm">
            // Seleccionados por complejidad técnica y arquitectura.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {featuredProjects.map((project) => {
            // Hacemos fallback a 'production' si por alguna razón un proyecto destacado no tiene status
            const statusInfo = STATUS_CONFIG[project.status || "production"];

            return (
              <Link
                key={project.id}
                // Generamos la ruta usando el "name" (slug) de la terminal
                href={`/projects/${project.name}`}
                className="relative group transition-all"
              >
                <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100">
                  <div className="absolute -top-10 -left-10 w-48 h-48 bg-blue-500/25 rounded-full blur-[100px]" />
                  <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-orange-500/25 rounded-full blur-[100px]" />
                </div>

                <Card className="max-w-2xl mx-auto lg:mx-0 h-full bg-background border-border group-hover:border-foreground/20 transition-all duration-300 shadow-sm overflow-hidden relative pt-0 group-hover:scale-[1.02]">

                  <div className="relative aspect-video w-full overflow-hidden border-b border-border">
                    <div className="absolute inset-0 z-10 bg-black/15" />
                    {/* Renderizamos la imagen solo si existe */}
                    {project.imageUrl && (
                      <img
                        src={project.imageUrl}
                        alt={`Visualización de ${project.title}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 brightness-100 dark:brightness-100"
                      />
                    )}
                  </div>

                  <CardHeader className="pt-5 pb-3">
                    <div className="flex justify-between items-start gap-4 mb-1.5">
                      <CardTitle className="font-sans text-xl group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </CardTitle>

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
                      {project.desc}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pb-5 pt-0">
                    <div className="flex flex-wrap gap-2">
                      {/* Usamos techStack en lugar de tags */}
                      {project.techStack.map((tech) => (
                        <Badge key={tech} variant="secondary" className="font-mono text-xs font-normal px-2.5 py-0.5">
                          {tech}
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