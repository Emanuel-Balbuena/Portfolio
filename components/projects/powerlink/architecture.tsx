// components/projects/powerlink/architecture-blueprint.tsx

"use client";

import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Cpu, Database, Globe, LucideIcon, Microchip, Server, Wifi, Zap } from "lucide-react";


// 1. Definimos la interfaz para nuestros Nodos de Arquitectura
interface NodeProps {
    title: string;
    icon: LucideIcon; // <--- ¡El cambio clave está aquí!
    tech: string;
    description: string;
    metrics?: string;
}

// 2. Sub-componente Reutilizable (DRY)
const ArchitectureNode = ({ title, icon: Icon, tech, description, metrics }: NodeProps) => {
    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                {/* Bloque visual del nodo */}
                <div className="flex flex-col items-center justify-center p-4 w-40 h-32 rounded-xl border border-border bg-card/50 backdrop-blur-sm shadow-sm cursor-crosshair transition-all hover:border-blue-500/30 hover:bg-blue-500/5 hover:scale-105 group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Icon className="w-8 h-8 text-muted-foreground group-hover:text-blue-400 transition-colors mb-3 relative z-10" />
                    <span className="text-sm font-medium text-foreground text-center relative z-10">{title}</span>
                </div>
            </HoverCardTrigger>

            {/* Tarjeta flotante con detalles técnicos */}
            <HoverCardContent className="w-80 bg-background/95 backdrop-blur-md border-border shadow-xl">
                <div className="flex justify-between items-start mb-2">
                    <h4 className="text-sm font-bold font-sans">{title}</h4>
                    <Badge variant="secondary" className="font-mono text-[10px] px-2 py-0">
                        {tech}
                    </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                    {description}
                </p>
                {metrics && (
                    <div className="flex items-center gap-2 text-xs font-mono text-blue-500 bg-blue-500/10 px-2 py-1 rounded-md w-fit">
                        <Zap className="w-3 h-3" />
                        {metrics}
                    </div>
                )}
            </HoverCardContent>
        </HoverCard>
    );
};

export function PowerLinkArchitecture() {
    return (
        <div className="flex flex-col w-full max-w-5xl mx-auto pt-0 pb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">

            {/* Cabecera del Acto III */}
            <div className="mb-10 flex flex-col gap-2 text-center items-center w-full">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-2 border border-blue-500/20">
                    <Server className="w-6 h-6 text-blue-500" />
                </div>
                <p className="text-sm font-mono text-blue-500 uppercase tracking-widest">Versión 2.0</p>
                <h2 className="text-3xl font-bold tracking-tight font-sans text-foreground">Arquitectura de Sistemas</h2>
                <p className="text-muted-foreground text-base max-w-2xl mt-2">
                    Topología de red y segmentación de responsabilidades. Interacción en tiempo real entre los nodos de hardware (Edge) y los servicios de orquestación (Cloud).
                </p>
            </div>

            <Tabs defaultValue="edge" className="w-full">
                <div className="flex justify-center mb-8">
                    <TabsList className="bg-background border border-border">
                        <TabsTrigger value="edge" className="font-mono text-xs uppercase tracking-wider">01. Capa Edge (Hardware)</TabsTrigger>
                        <TabsTrigger value="cloud" className="font-mono text-xs uppercase tracking-wider">02. Capa Cloud (Backend)</TabsTrigger>
                    </TabsList>
                </div>

                {/* --- PESTAÑA 1: EDGE --- */}
                <TabsContent value="edge" className="flex flex-col items-center justify-center min-h-[300px] border border-border rounded-2xl bg-card/20 relative overflow-hidden p-8">
                    {/* Grid de fondo tipo plano arquitectónico */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-4 md:gap-8">
                        <ArchitectureNode
                            title="Sensor Array"
                            icon={Microchip}
                            tech="SCT-013 / ACS712"
                            description="Transformadores de corriente no invasivos. Adquisición de señales analógicas puras con filtrado por hardware antes de la digitalización."
                            metrics="Muestreo: 1000 Hz"
                        />
                        <ArrowRight className="w-6 h-6 text-muted-foreground/50 rotate-90 md:rotate-0" />

                        <ArchitectureNode
                            title="Microcontrolador"
                            icon={Cpu}
                            tech="ESP32 (C++)"
                            description="Procesamiento en el borde (Edge Computing). Calcula RMS, potencia aparente e integra lógica de reconexión automática (Watchdog Timer)."
                            metrics="Dual-Core 240MHz"
                        />
                        <ArrowRight className="w-6 h-6 text-muted-foreground/50 rotate-90 md:rotate-0" />

                        <ArchitectureNode
                            title="Gateway Inalámbrico"
                            icon={Wifi}
                            tech="WiFi + TLS 1.2"
                            description="Módulo de comunicación. Cifra los payloads en formato JSON antes de enviarlos a la red externa para evitar intercepciones (Man-in-the-Middle)."
                            metrics="Protocolo: MQTT/WSS"
                        />
                    </div>
                </TabsContent>

                {/* --- PESTAÑA 2: CLOUD --- */}
                <TabsContent value="cloud" className="flex flex-col items-center justify-center min-h-[300px] border border-border rounded-2xl bg-card/20 relative overflow-hidden p-8">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-4 md:gap-8 flex-wrap justify-center">
                        <ArchitectureNode
                            title="Base de Datos"
                            icon={Database}
                            tech="PostgreSQL (Supabase)"
                            description="Almacenamiento relacional para telemetría histórica. Tablas optimizadas con índices sobre marcas de tiempo (Time-Series data) para consultas rápidas."
                            metrics="Consultas en < 50ms"
                        />
                        <ArrowRight className="w-6 h-6 text-muted-foreground/50 rotate-90 md:rotate-0 hidden md:block" />

                        <ArchitectureNode
                            title="Orquestador API"
                            icon={Server}
                            tech="Next.js App Router"
                            description="Server Components y Route Handlers (Serverless). Maneja la autenticación segura, validación de sesiones y renderizado híbrido de la interfaz."
                            metrics="Vercel Edge Network"
                        />
                        <ArrowRight className="w-6 h-6 text-muted-foreground/50 rotate-90 md:rotate-0 hidden md:block" />

                        <ArchitectureNode
                            title="Cliente Reactivo"
                            icon={Globe}
                            tech="React + Realtime"
                            description="Interfaz de usuario que se suscribe a canales de WebSockets. Actualiza gráficos y estados de relés instantáneamente sin necesidad de recargar la página."
                            metrics="Latencia UI: ~45ms"
                        />
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}