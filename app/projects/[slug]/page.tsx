// app/projects/[slug]/page.tsx
import { PowerLinkDetail } from "@/components/projects/powerlink-detail";
import { Badge } from "@/components/ui/badge";
import { PROJECTS } from "@/lib/projects";
import { ArrowLeft } from "lucide-react";
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
        <main className="min-h-screen pt-24 pb-16 px-6 max-w-7xl mx-auto relative">
            <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-primary transition-colors mb-8 group"
            >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Volver_al_Dashboard
            </Link>

            <header className="mb-12 border-b border-border pb-8">
                <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
                    <div className="flex items-center gap-2 text-primary font-mono text-sm">
                        <span className="opacity-50">projects /</span>
                        <span>{project.name}</span>
                    </div>
                    {/* Este badge muestra el estado REAL del proyecto, no de la página */}
                    <Badge variant="outline" className="font-mono text-xs text-emerald-500 border-emerald-500/20 bg-emerald-500/10">
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
        </main>
    );
}