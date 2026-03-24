// app/projects/[slug]/page.tsx
import { PowerLinkDetail } from "@/components/projects/powerlink-detail";
import { Badge } from "@/components/ui/badge";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { PROJECTS } from "@/lib/projects";
import Link from "next/link";
import { notFound } from "next/navigation";

const projectComponents: Record<string, React.ComponentType> = {
    "powerlink": PowerLinkDetail,
};

export async function generateStaticParams() {
    return PROJECTS.map((project) => ({ slug: project.name }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = PROJECTS.find((p) => p.name === slug);

    if (!project) notFound();

    const CustomProjectView = projectComponents[project.name];

    return (
        <main className="min-h-screen w-full bg-background flex flex-col items-center pt-24 pb-12 px-4 sm:px-8 relative">

            {/* 2. INNER WRAPPER: Contenedor del contenido estricto a 1024px, sin paddings extra */}
            <div className="w-full max-w-5xl">

                <header className="mb-12 border-b border-border pb-8">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
                        {/* BREADCRUMB (Izquierda) */}
                        <Breadcrumb>
                            <BreadcrumbList className="font-mono text-sm">
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        <Link href="/">Home</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        <Link href="/projects">Proyectos</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{project.name}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>

                        <Badge
                            variant="outline"
                            className="font-mono text-xs text-emerald-500 border-emerald-500/20 bg-emerald-500/10 shrink-0"
                        >
                            STATUS: {project.status?.toUpperCase() || "PRODUCTION"}
                        </Badge>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 font-sans text-foreground">
                        {project.title}
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
                        {project.longDesc || project.desc}
                    </p>
                </header>

                {/* RENDERIZADO AISLADO: El componente decide qué mostrar */}
                {CustomProjectView ? (
                    <CustomProjectView />
                ) : (
                    <div className="border border-border p-8 rounded-xl bg-muted/5 flex items-center justify-center min-h-[400px]">
                        <p className="text-muted-foreground font-mono flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                            Aguardando_Componente_Visual
                        </p>
                    </div>
                )}

            </div>
        </main>
    );
}