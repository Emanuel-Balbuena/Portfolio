"use client";

import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Cpu, Database, Globe, Microchip, MousePointerClick, Server, Wifi, Zap } from "lucide-react";
import { useState } from "react";

// Tipado para nuestro estado nulo
type NodeData = typeof ARCHITECTURE_DATA.edge[0];

const ARCHITECTURE_DATA = {
    edge: [
        {
            id: "dsp",
            title: "DSP PZEM004Tv30",
            icon: Microchip,
            tech: "Hardware UART",
            description: "Procesador de Señales Digitales dedicado. Realiza el cálculo matemático pesado de la corriente RMS y la potencia activa por hardware, liberando al microcontrolador principal.",
            metrics: "Precisión: 99% | Muestreo: 1000Hz",
        },
        {
            id: "mcu",
            title: "ESP32-S3 Core",
            icon: Cpu,
            tech: "C++ / FreeRTOS",
            description: "Cerebro del nodo (Firmware V8.0). Ejecuta la lógica de integración de energía (Watts a Joules), controla los relés de alto voltaje y gestiona la persistencia de estado en memoria NVS.",
            metrics: "Dual-Core 240MHz | Watchdog Activo",
        },
        {
            id: "comms",
            title: "Redundancia Híbrida",
            icon: Wifi,
            tech: "Wi-Fi / SD_MMC",
            description: "Módulo de contingencia. Si el enlace a internet se pierde, activa la bandera 'isOffline' y aplica un patrón Store-and-Forward reteniendo los payloads en una tarjeta MicroSD local.",
            metrics: "Protocolo: HTTP POST / WSS",
        }
    ],
    cloud: [
        {
            id: "ingest",
            title: "Edge Functions",
            icon: Server,
            tech: "Deno / TypeScript",
            description: "Punto de ingesta serverless. Recibe las peticiones HTTP del hardware, autentica la MAC del dispositivo y previene inyecciones antes de escribir en la base de datos.",
            metrics: "Cold Start: < 10ms",
        },
        {
            id: "db",
            title: "PostgreSQL (Supabase)",
            icon: Database,
            tech: "Time-Series / CDC",
            description: "Almacenamiento relacional. Utiliza Change Data Capture (CDC) para emitir eventos de mutación instantáneos cuando un estado cambia, optimizado para series de tiempo.",
            metrics: "Consultas: < 50ms",
        },
        {
            id: "client",
            title: "App Router & Realtime",
            icon: Globe,
            tech: "Next.js / WebSockets",
            description: "Frontend bimodal. Se suscribe a los canales de Supabase Realtime para actualizar gráficas de consumo en vivo y emitir comandos de actuación (apagar/encender) sin recargar.",
            metrics: "Latencia UI: ~45ms",
        }
    ]
};

export function PowerLinkArchitecture() {
    // 1. Solución UX: Inicializamos en NULL para forzar la interacción del usuario
    const [selectedEdgeNode, setSelectedEdgeNode] = useState<NodeData | null>(null);
    const [selectedCloudNode, setSelectedCloudNode] = useState<NodeData | null>(null);

    // Componente reutilizable para el Inspector (Evita código duplicado y maneja el estado NULL)
    const InspectorPanel = ({ node, colorTheme }: { node: NodeData | null, colorTheme: 'blue' | 'blue' }) => {
        const themeConfig = {
            blue: { border: "bg-blue-500", badge: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400", icon: "text-blue-500" },
        };

        if (!node) {
            return (
                <div className="w-full h-[200px] md:h-[180px] bg-card/30 border border-dashed border-border rounded-2xl flex flex-col items-center justify-center gap-3 animate-in fade-in duration-500">
                    <MousePointerClick className="w-6 h-6 text-muted-foreground/50 animate-bounce" />
                    <p className="text-sm font-mono text-muted-foreground">Esperando telemetría... Selecciona un nodo.</p>
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
                <p className="text-sm font-mono text-blue-500 uppercase tracking-widest">Arquitectura V8.0</p>
                <h2 className="text-3xl font-bold tracking-tight font-sans text-foreground">Topología del Sistema</h2>
                <p className="text-muted-foreground text-base max-w-2xl mt-2">
                    Visualiza el flujo de datos End-to-End. Toca cualquier nodo en el diagrama para inspeccionar su rol específico.
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
                            01. Capa Edge (Hardware)
                        </TabsTrigger>
                        <TabsTrigger value="cloud" className="font-mono text-[10px] sm:text-xs uppercase tracking-wider px-3 sm:px-4">
                            02. Capa Cloud (Backend)
                        </TabsTrigger>
                    </TabsList>
                </div>

                {/* ========================================== */}
                {/* PESTAÑA 1: EDGE (HARDWARE)                   */}
                {/* ========================================== */}
                <TabsContent value="edge" className="flex flex-col gap-6 outline-none">

                    {/* 2. Solución Móvil: Scroll Horizontal Oculto (Carrusel) */}
                    <div className="flex flex-row items-center justify-start md:justify-center min-h-[250px] border border-border rounded-2xl bg-card/20 relative overflow-x-auto snap-x snap-mandatory px-4 md:px-8 py-8 w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

                        <div className="relative z-10 flex flex-row items-center gap-4 md:gap-8 min-w-max px-4">
                            {ARCHITECTURE_DATA.edge.map((node, index) => {
                                const isActive = selectedEdgeNode?.id === node.id;
                                return (
                                    <div key={node.id} className="flex flex-row items-center gap-4 md:gap-8 shrink-0 snap-center">

                                        <button
                                            onClick={() => setSelectedEdgeNode(node)}
                                            className={`flex flex-col items-center justify-center p-4 w-40 h-32 rounded-xl border backdrop-blur-sm transition-all duration-300 relative overflow-hidden group focus:outline-none ${isActive
                                                ? "border-blue-500/50 bg-blue-500/10 scale-105 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                                                : "border-border bg-card/50 hover:border-blue-500/30 hover:bg-blue-500/5"
                                                }`}
                                        >
                                            <node.icon className={`w-8 h-8 mb-3 transition-colors ${isActive ? "text-blue-500" : "text-muted-foreground group-hover:text-blue-400"}`} />
                                            <span className={`text-sm font-medium text-center leading-tight ${isActive ? "text-foreground" : "text-muted-foreground"}`}>{node.title}</span>
                                        </button>

                                        {/* Las flechas ahora SIEMPRE apuntan a la derecha, incluso en móvil */}
                                        {index < ARCHITECTURE_DATA.edge.length - 1 && (
                                            <ArrowRight className="w-6 h-6 text-muted-foreground/40 shrink-0" />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <InspectorPanel node={selectedEdgeNode} colorTheme="blue" />
                </TabsContent>

                {/* ========================================== */}
                {/* PESTAÑA 2: CLOUD (BACKEND)                   */}
                {/* ========================================== */}
                <TabsContent value="cloud" className="flex flex-col gap-6 outline-none">

                    <div className="flex flex-row items-center justify-start md:justify-center min-h-[250px] border border-border rounded-2xl bg-card/20 relative overflow-x-auto snap-x snap-mandatory px-4 md:px-8 py-8 w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

                        <div className="relative z-10 flex flex-row items-center gap-4 md:gap-8 min-w-max px-4">
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

                    <InspectorPanel node={selectedCloudNode} colorTheme="blue" />
                </TabsContent>
            </Tabs>
        </div>
    );
}