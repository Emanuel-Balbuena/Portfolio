"use client";

import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Cpu, Database, Globe, Microchip, MousePointerClick, Server, Wifi, Zap } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";

// Tipado para nuestro estado nulo
type NodeData = {
    id: string;
    title: string;
    icon: React.ElementType;
    tech: string;
    description: string;
    metrics: string;
};

export function PowerLinkArchitecture() {
    const t = useTranslations("PowerLink.Architecture");
    // 1. Solución UX: Inicializamos en NULL para forzar la interacción del usuario
    const [selectedEdgeNode, setSelectedEdgeNode] = useState<NodeData | null>(null);
    const [selectedCloudNode, setSelectedCloudNode] = useState<NodeData | null>(null);

    const ARCHITECTURE_DATA = {
        edge: [
            {
                id: "dsp",
                title: t("nodes.dsp.title"),
                icon: Microchip,
                tech: "Hardware UART",
                description: t("nodes.dsp.description"),
                metrics: t("nodes.dsp.metrics"),
            },
            {
                id: "mcu",
                title: t("nodes.mcu.title"),
                icon: Cpu,
                tech: "C++ / FreeRTOS",
                description: t("nodes.mcu.description"),
                metrics: t("nodes.mcu.metrics"),
            },
            {
                id: "comms",
                title: t("nodes.comms.title"),
                icon: Wifi,
                tech: "Wi-Fi / SD_MMC",
                description: t("nodes.comms.description"),
                metrics: t("nodes.comms.metrics"),
            }
        ],
        cloud: [
            {
                id: "ingest",
                title: t("nodes.ingest.title"),
                icon: Server,
                tech: "Deno / TypeScript",
                description: t("nodes.ingest.description"),
                metrics: t("nodes.ingest.metrics"),
            },
            {
                id: "db",
                title: t("nodes.db.title"),
                icon: Database,
                tech: "Time-Series / CDC",
                description: t("nodes.db.description"),
                metrics: t("nodes.db.metrics"),
            },
            {
                id: "client",
                title: t("nodes.client.title"),
                icon: Globe,
                tech: "Next.js / WebSockets",
                description: t("nodes.client.description"),
                metrics: t("nodes.client.metrics"),
            }
        ]
    };

    // Componente reutilizable para el Inspector (Evita código duplicado y maneja el estado NULL)
    const InspectorPanel = ({ node, colorTheme }: { node: NodeData | null, colorTheme: 'blue' | 'blue' }) => {
        const themeConfig = {
            blue: { border: "bg-blue-500", badge: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400", icon: "text-blue-500" },
        };

        if (!node) {
            return (
                <div className="w-full h-[200px] md:h-[180px] bg-card/30 border border-dashed border-border rounded-2xl flex flex-col items-center justify-center gap-3 animate-in fade-in duration-500">
                    <MousePointerClick className="w-6 h-6 text-muted-foreground/50 animate-bounce" />
                    <p className="text-sm font-mono text-muted-foreground">{t("waitingTelemetry")}</p>
                </div>
            );
        }

        const theme = themeConfig[colorTheme];

        return (
            <div className="w-full min-h-[200px] md:min-h-[180px] bg-slate-50 dark:bg-[#0a0a0a] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-10 items-start md:items-center shadow-sm relative overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${theme.border}`}></div>
                <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{node.title}</h3>
                        <Badge variant="secondary" className={`font-mono text-xs ${theme.badge}`}>
                            {node.tech}
                        </Badge>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm md:text-base">
                        {node.description}
                    </p>
                </div>
                <div className="w-full md:w-auto flex items-center justify-start md:justify-center p-4 bg-white dark:bg-background border border-slate-200 dark:border-slate-800 rounded-xl shrink-0">
                    <div className="flex items-center gap-2 text-sm font-mono text-slate-700 dark:text-slate-300">
                        <Zap className={`w-4 h-4 ${theme.icon}`} />
                        {node.metrics}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col w-full max-w-5xl mx-auto pt-0 pb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">

            {/* Cabecera */}
            <div className="mb-10 flex flex-col gap-2 text-center items-center w-full">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-2 border border-blue-500/20">
                    <Server className="w-6 h-6 text-blue-500" />
                </div>
                <p className="text-sm font-mono text-blue-500 uppercase tracking-widest">{t("badge")}</p>
                <h2 className="text-3xl font-bold tracking-tight font-sans text-foreground">{t("title")}</h2>
                <p className="text-muted-foreground text-base max-w-2xl mt-2">
                    {t("description")}
                </p>
            </div>

            <Tabs defaultValue="edge" className="w-full" onValueChange={() => {
                // Opcional: Limpiar la selección al cambiar de pestaña
                setSelectedEdgeNode(null);
                setSelectedCloudNode(null);
            }}>
                <div className="flex justify-center mb-8 px-4 w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    <TabsList className="bg-background border border-border inline-flex w-max">
                        {/* Reducimos el texto a text-[10px] en móvil y vuelve a text-xs en sm (tablets/PC) */}
                        <TabsTrigger value="edge" className="font-mono text-[10px] sm:text-xs uppercase tracking-wider px-3 sm:px-4">
                            {t("tabEdge")}
                        </TabsTrigger>
                        <TabsTrigger value="cloud" className="font-mono text-[10px] sm:text-xs uppercase tracking-wider px-3 sm:px-4">
                            {t("tabCloud")}
                        </TabsTrigger>
                    </TabsList>
                </div>

                {/* ========================================== */}
                {/* PESTAÑA 1: EDGE (HARDWARE)                   */}
                {/* ========================================== */}
                <TabsContent value="edge" className="flex flex-col gap-6 outline-none">

                    {/* Contenedor Padre: Fijo, dibuja el borde, la cuadrícula y asegura el tamaño mínimo */}
                    <div className="relative flex flex-col items-center justify-center min-h-[250px] w-full border border-border rounded-2xl bg-card/20 overflow-hidden">
                        {/* La Cuadrícula de Fondo (Estática) */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

                        {/* El Carrusel (Flota encima de la cuadrícula, hace el scroll horizontal) */}
                        <div className="relative z-10 flex flex-row items-center justify-start md:justify-center overflow-x-auto snap-x snap-mandatory w-full py-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

                            {/* Inner wrapper para forzar el ancho y el padding lateral en el scroll */}
                            <div className="flex flex-row items-center gap-4 md:gap-8 min-w-max px-6 md:px-0 mx-auto">
                                {ARCHITECTURE_DATA.edge.map((node, index) => {
                                    const isActive = selectedEdgeNode?.id === node.id;
                                    return (
                                        <div key={node.id} className="flex flex-row items-center gap-4 md:gap-8 shrink-0 snap-center">

                                            <button
                                                onClick={() => setSelectedEdgeNode(node)}
                                                className={`flex flex-col items-center justify-center p-4 w-40 h-32 rounded-xl border backdrop-blur-sm transition-all duration-300 relative overflow-hidden group focus:outline-none ${isActive
                                                    ? "border-blue-500/50 bg-blue-500/10 scale-105 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                                                    : "border-border bg-card/50 hover:border-blue-500/30 hover:bg-blue-500/5"
                                                    }`}
                                            >
                                                <node.icon className={`w-8 h-8 mb-3 transition-colors ${isActive ? "text-blue-500" : "text-muted-foreground group-hover:text-blue-400"}`} />
                                                <span className={`text-sm font-medium text-center leading-tight ${isActive ? "text-foreground" : "text-muted-foreground"}`}>{node.title}</span>
                                            </button>

                                            {/* Flecha conectora */}
                                            {index < ARCHITECTURE_DATA.edge.length - 1 && (
                                                <ArrowRight className="w-6 h-6 text-muted-foreground/40 shrink-0" />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <InspectorPanel node={selectedEdgeNode} colorTheme="blue" />
                </TabsContent>

                {/* ========================================== */}
                {/* PESTAÑA 2: CLOUD (BACKEND)                   */}
                {/* ========================================== */}
                <TabsContent value="cloud" className="flex flex-col gap-6 outline-none">

                    {/* Contenedor Padre: Fijo */}
                    <div className="relative flex flex-col items-center justify-center min-h-[250px] w-full border border-border rounded-2xl bg-card/20 overflow-hidden">
                        {/* La Cuadrícula de Fondo (Estática) */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

                        {/* El Carrusel */}
                        <div className="relative z-10 flex flex-row items-center justify-start md:justify-center overflow-x-auto snap-x snap-mandatory w-full py-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

                            {/* Inner wrapper */}
                            <div className="flex flex-row items-center gap-4 md:gap-8 min-w-max px-6 md:px-0 mx-auto">
                                {ARCHITECTURE_DATA.cloud.map((node, index) => {
                                    const isActive = selectedCloudNode?.id === node.id;
                                    return (
                                        <div key={node.id} className="flex flex-row items-center gap-4 md:gap-8 shrink-0 snap-center">

                                            <button
                                                onClick={() => setSelectedCloudNode(node)}
                                                className={`flex flex-col items-center justify-center p-4 w-40 h-32 rounded-xl border backdrop-blur-sm transition-all duration-300 relative overflow-hidden group focus:outline-none ${isActive
                                                    ? "border-blue-500/50 bg-blue-500/10 scale-105 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                                                    : "border-border bg-card/50 hover:border-blue-500/30 hover:bg-blue-500/5"
                                                    }`}
                                            >
                                                <node.icon className={`w-8 h-8 mb-3 transition-colors ${isActive ? "text-blue-500" : "text-muted-foreground group-hover:text-blue-400"}`} />
                                                <span className={`text-sm font-medium text-center leading-tight ${isActive ? "text-foreground" : "text-muted-foreground"}`}>{node.title}</span>
                                            </button>

                                            {index < ARCHITECTURE_DATA.cloud.length - 1 && (
                                                <ArrowRight className="w-6 h-6 text-muted-foreground/40 shrink-0" />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <InspectorPanel node={selectedCloudNode} colorTheme="blue" />
                </TabsContent>
            </Tabs>
        </div>
    );
}