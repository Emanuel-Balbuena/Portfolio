"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Cpu, ExternalLink, Eye, Github, Layers, Mic, ShieldCheck, TrendingDown, Zap } from "lucide-react";

export function PowerLinkExecutive() {
    return (
        <div className="flex flex-col w-full animate-in fade-in slide-in-from-bottom-4 duration-1000">

            {/* 1. Botones de Acción Inmediata */}
            <div className="flex flex-wrap items-center gap-4 mt-8 mb-16 relative z-10">
                <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-900/20 transition-all hover:scale-105">
                    <a href="https://power-link-2.vercel.app" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Ver Proyecto en Vivo
                    </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-border hover:bg-muted transition-all hover:scale-105">
                    <a href="https://github.com/Emanuel-Balbuena/PowerLink-2.git" target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        Ver Repositorio
                    </a>
                </Button>
            </div>

            {/* 2. El Pitch (Bento Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">

                {/* --- TARJETA 1: El Problema --- */}
                <div className="relative group transition-all h-full block">
                    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100">
                        <div className="absolute -top-10 -left-10 w-48 h-48 bg-blue-500/20 rounded-full blur-[100px]" />
                        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-orange-500/20 rounded-full blur-[100px]" />
                    </div>

                    <Card className="z-10 h-full bg-background/80 backdrop-blur-sm border-border group-hover:border-foreground/20 transition-all duration-300 shadow-sm relative group-hover:scale-[1.01] overflow-hidden flex flex-col">
                        {/* Todo el contenido agrupado en el Header para que fluya hacia abajo */}
                        <CardHeader className="pt-6 pb-6">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400 shrink-0">
                                <Zap className="w-5 h-5" />
                            </div>
                            <CardTitle className="font-sans text-xl group-hover:text-blue-400 transition-colors">
                                El Problema
                            </CardTitle>
                            {/* Unificado a text-base y con un margin-top sutil */}
                            <CardDescription className="text-base text-muted-foreground leading-relaxed mt-2">
                                El consumo eléctrico es un gasto ciego. Las personas reciben facturas sin saber qué electrodoméstico drena su dinero, careciendo de herramientas para auditar su consumo o proteger sus equipos de variaciones.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </div>

                {/* --- TARJETA 2: La Solución (Span 2) --- */}
                <div className="relative group transition-all h-full block md:col-span-2">
                    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100">
                        <div className="absolute -top-20 -left-10 w-64 h-64 bg-blue-500/20 rounded-full blur-[120px]" />
                        <div className="absolute -bottom-20 -right-10 w-64 h-64 bg-orange-500/20 rounded-full blur-[120px]" />
                    </div>

                    <Card className="z-10 h-full bg-background/80 backdrop-blur-sm border-border group-hover:border-foreground/20 transition-all duration-300 shadow-sm relative group-hover:scale-[1.01] overflow-hidden flex flex-col">
                        <CardHeader className="pt-6 pb-4">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400 shrink-0">
                                <Eye className="w-5 h-5" />
                            </div>
                            <CardTitle className="font-sans text-xl font-bold tracking-tight group-hover:text-blue-400 transition-colors">
                                Hacer visible lo invisible.
                            </CardTitle>
                            <CardDescription className="text-base text-muted-foreground leading-relaxed max-w-xl mt-2">
                                PowerLink transforma la red eléctrica en datos tangibles. Un ecosistema IoT de grado producción que mide, grafica y controla el consumo en tiempo real, permitiendo identificar dispositivos "vampiro" y operar cargas de alto voltaje globalmente.
                            </CardDescription>
                        </CardHeader>

                        {/* Aquí SÍ conservamos mt-auto para que los íconos se queden siempre al pie de la tarjeta */}
                        <CardContent className="pt-0 pb-6 mt-auto">
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-border/50">
                                {[
                                    { icon: Cpu, label: "5 Nodos", desc: "En Producción Activa", color: "text-emerald-500" },
                                    { icon: Mic, label: "Alexa", desc: "Integración Nativa", color: "text-blue-500" },
                                    { icon: ShieldCheck, label: "OWASP", desc: "Estándares de Seguridad", color: "text-amber-500" },
                                    { icon: Zap, label: "Escalable", desc: "Arquitectura Serverless", color: "text-purple-500" }
                                ].map((item, i) => (
                                    <div key={i} className="flex flex-col gap-1 group/metric">
                                        <span className={`flex items-center gap-1.5 text-xs font-mono ${item.color} transition-transform group-hover/metric:translate-x-1`}>
                                            <item.icon className="w-3.5 h-3.5" /> {item.label}
                                        </span>
                                        <span className="text-xs text-muted-foreground font-medium">{item.desc}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* --- TARJETA 3: Product Ownership (Span 2) --- */}
                <div className="relative group transition-all h-full block md:col-span-2">
                    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100">
                        <div className="absolute top-1/2 left-0 w-48 h-48 bg-blue-500/20 rounded-full blur-[100px] -translate-y-1/2" />
                        <div className="absolute top-1/2 right-0 w-48 h-48 bg-orange-500/20 rounded-full blur-[100px] -translate-y-1/2" />
                    </div>

                    <Card className="z-10 h-full bg-background/80 backdrop-blur-sm border-border group-hover:border-foreground/20 transition-all duration-300 shadow-sm relative group-hover:scale-[1.01] overflow-hidden flex flex-col">
                        <CardHeader className="pt-6 pb-6">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400 shrink-0">
                                <Layers className="w-5 h-5" />
                            </div>
                            <CardTitle className="font-sans text-xl group-hover:text-blue-400 transition-colors">
                                Ingeniería End-to-End
                            </CardTitle>
                            {/* Unificado a text-base */}
                            <CardDescription className="text-base text-muted-foreground leading-relaxed italic border-l-2 border-transparent group-hover:border-blue-500/50 pl-4 transition-all duration-300 mt-2">
                                "PowerLink es una muestra de ingeniería de ciclo completo (Full-Cycle). Diseñé el hardware físico, programé el firmware en C++ para tolerar fallos de red, diseñé la base de datos relacional y construí esta interfaz web fluida. No solo escribo código; construyo sistemas que resuelven problemas reales."
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </div>

                {/* --- TARJETA 4: El Valor Comercial --- */}
                <div className="relative group transition-all h-full block">
                    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100">
                        <div className="absolute -top-10 -right-10 w-48 h-48 bg-orange-500/20 rounded-full blur-[100px]" />
                        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-500/20 rounded-full blur-[100px]" />
                    </div>

                    <Card className="z-10 h-full bg-background/80 backdrop-blur-sm border-border group-hover:border-foreground/20 transition-all duration-300 shadow-sm relative group-hover:scale-[1.01] overflow-hidden flex flex-col">
                        <CardHeader className="pt-6 pb-6">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400 shrink-0">
                                <TrendingDown className="w-5 h-5" />
                            </div>
                            <CardTitle className="font-sans text-xl group-hover:text-blue-400 transition-colors">
                                Impacto y ROI
                            </CardTitle>
                            {/* Unificado a text-base */}
                            <CardDescription className="text-base text-muted-foreground leading-relaxed mt-2">
                                Más allá del software, la plataforma está diseñada para el <strong>Retorno de Inversión</strong>. Permite auditorías de energía preventivas, prolonga la vida útil de aparatos críticos.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </div>

            </div>

            {/* Puente hacia la Ingeniería */}
            <div className="flex flex-col items-center justify-center text-center mt-4 mb-8 opacity-80">
                <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-2">Descubre la arquitectura interna</p>
                <div className="w-[2px] h-24 bg-gradient-to-b from-border to-transparent"></div>
            </div>

        </div>
    );
}