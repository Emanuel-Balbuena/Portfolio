// app/projects/page.tsx

"use client";

import { TerminalWindow } from "@/components/terminal-window";
import { PROJECTS, SystemStatus } from "@/lib/projects";
import { ArrowRight, LayoutGrid, Terminal } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";

// Importaciones de diseño consistentes con el inicio (shadcn/ui)
import { Badge } from "@/components/ui/badge";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Mapa de estados reutilizado para consistencia
const STATUS_STYLE: Record<SystemStatus, { className: string }> = {
    production: {
        className: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
    },
    maintenance: {
        className: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/20"
    },
    paused: {
        className: "bg-zinc-500/15 text-zinc-600 dark:text-zinc-400 border-zinc-500/20"
    },
    closed: {
        className: "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/20"
    },
};

export default function ProjectsPage() {
    const locale = useLocale() as "es" | "en";
    const [view, setView] = useState<'grid' | 'terminal'>('grid');
    const tBreadcrumbs = useTranslations("Breadcrumbs");
    const t = useTranslations("ProjectsPage");
    const tProjects = useTranslations("Projects");

    // NUEVO ESTADO: Para controlar el renderizado real de la Terminal vs su visibilidad
    const [isTerminalMounted, setIsTerminalMounted] = useState(false);

    const toggleView = () => {
        if (view === 'grid') {
            // ENCENDIDO: Mostramos terminal, montamos componente
            setView('terminal');
            setIsTerminalMounted(true);
        } else {
            // APAGADO (Diferido): Primero iniciamos animación visual en el padre
            setView('grid');

            // Esperamos 400ms (duración de la animación crtOff definida abajo) antes de desmontar
            setTimeout(() => {
                setIsTerminalMounted(false);
            }, 400);
        }
    }; // <--- SOLUCIÓN: Cerramos la función toggleView aquí.

    // El return ahora pertenece correctamente al componente ProjectsPage
    return (
        <div className="min-h-screen w-full bg-background flex flex-col items-center pt-24 pb-12 px-4 sm:px-8 overflow-hidden relative">

            {/* INYECCIÓN DE ANIMACIONES CRT ESTILO RETRO (ON/OFF) */}
            <style dangerouslySetInnerHTML={{
                __html: `
            .crt-on {
                animation: crtOn 0.5s cubic-bezier(0.23, 1, 0.32, 1) forwards;
            }
            .crt-off {
                animation: crtOff 0.4s cubic-bezier(0.23, 1, 0.32, 1) forwards;
            }
            @keyframes crtOn {
                0% { transform: scale(0.01, 0.005); opacity: 0; filter: brightness(10); }
                40% { transform: scale(1, 0.005); opacity: 1; filter: brightness(5); }
                100% { transform: scale(1, 1); opacity: 1; filter: brightness(1); }
            }
            /* Animación de colapso en un punto brillante */
            @keyframes crtOff {
                0% { transform: scale(1, 1); opacity: 1; filter: brightness(1); }
                60% { transform: scale(1, 0.005); opacity: 1; filter: brightness(5); }
                100% { transform: scale(0.01, 0.005); opacity: 0; filter: brightness(10); }
            }
        `}} />

            {/* CABECERA Y CONTROLES */}
            <div className="w-full max-w-5xl flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-6 z-10">

                <div className="flex flex-col gap-4">
                    <Breadcrumb>
                        <BreadcrumbList className="font-mono text-sm">
                            <BreadcrumbItem>
                                {/* asChild delega el renderizado al Link de Next.js */}
                                <BreadcrumbLink asChild>
                                    <Link href="/">{tBreadcrumbs("home")}</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>{tBreadcrumbs("projects")}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    <div>
                        <h1 className="text-4xl font-bold font-sans tracking-tight text-slate-900 dark:text-slate-100 mb-2">
                            {t("title")}
                        </h1>
                        <p className="text-muted-foreground font-mono text-sm max-w-lg">
                            {t("subtitle")}
                        </p>
                    </div>
                </div>

                <button
                    onClick={toggleView}
                    className="group relative flex items-center gap-2 px-4 py-2 rounded-md bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-mono text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all shadow-sm hover:shadow-md"
                >
                    <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-md" />
                    {view === 'grid' ? (
                        <>
                            <Terminal className="w-4 h-4" />
                            <span>{t("startTerminal")}</span>
                        </>
                    ) : (
                        <>
                            <LayoutGrid className="w-4 h-4" />
                            <span>{t("backToGUI")}</span>
                        </>
                    )}
                </button>
            </div>

            {/* CONTENEDOR PRINCIPAL */}
            <div className="w-full max-w-5xl relative">

                {/* VISTA 1: LA LISTA DE PROYECTOS */}
                <div
                    className={`flex flex-col gap-6 transition-all duration-700 absolute inset-0 w-full ${view === 'grid'
                        ? "opacity-100 translate-y-0 pointer-events-auto relative"
                        : "opacity-0 translate-y-8 pointer-events-none absolute"
                        }`}
                >
                    {PROJECTS[locale].map((project) => {
                        const statusKey = project.status || "production";
                        const statusStyle = STATUS_STYLE[statusKey];
                        const statusLabel = tProjects(`status.${statusKey}`);

                        return (
                            <Link href={`/projects/${project.name}`} key={project.id} className="block relative group transition-all">
                                {/* Brillo de fondo (Glow) */}
                                <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100">
                                    <div className="absolute -top-10 -left-10 w-48 h-48 bg-blue-500/20 rounded-full blur-[100px]" />
                                    <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-orange-500/20 rounded-full blur-[100px]" />
                                </div>

                                <Card className="w-full bg-background border-border group-hover:border-foreground/20 transition-all duration-300 shadow-sm overflow-hidden relative group-hover:scale-[1.01] flex flex-col md:flex-row gap-0">
                                    <div className="flex-1 flex flex-col p-2">
                                        <CardHeader className="pt-5 pb-3">
                                            <div className="flex justify-between items-start gap-4 mb-1.5">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-[10px] font-mono text-muted-foreground">{project.id}</span>
                                                    <CardTitle className="font-sans text-2xl group-hover:text-blue-400 transition-colors">
                                                        {project.title}
                                                    </CardTitle>
                                                </div>
                                                <Badge variant="outline" className={cn("flex-shrink-0 font-mono text-xs font-normal border shadow-sm", statusStyle.className)}>
                                                    {statusLabel}
                                                </Badge>
                                            </div>
                                            <CardDescription className="text-base text-muted-foreground leading-relaxed mt-2 max-w-4xl">
                                                {project.desc}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="pb-5 pt-auto mt-auto flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
                                            <div className="flex flex-wrap gap-2">
                                                {project.techStack.map((tech) => (
                                                    <Badge key={tech} variant="secondary" className="font-mono text-xs font-normal px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800">
                                                        {tech}
                                                    </Badge>
                                                ))}
                                            </div>
                                            <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:border-blue-200 dark:group-hover:border-blue-500/30 transition-all group-hover:-rotate-45 shrink-0">
                                                <ArrowRight className="w-5 h-5" />
                                            </div>
                                        </CardContent>
                                    </div>
                                </Card>
                            </Link>
                        );
                    })}
                </div>

                {/* VISTA 2: LA TERMINAL */}
                <div
                    className={`w-full origin-center relative z-20 ${isTerminalMounted
                        ? (view === 'terminal' ? "crt-on pointer-events-auto" : "crt-off pointer-events-none absolute")
                        : "opacity-0 pointer-events-none hidden"
                        }`}
                >
                    {isTerminalMounted && <TerminalWindow />}
                </div>

            </div>
        </div>
    );
}