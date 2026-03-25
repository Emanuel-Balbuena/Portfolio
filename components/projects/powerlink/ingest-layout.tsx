"use client";

import { TerminalStory } from "@/components/terminal-story";
import { Badge } from "@/components/ui/badge";
import { ScrollStep } from "@/components/ui/scroll-step";
import { Clock, Cpu, Database, WifiOff } from "lucide-react";
import { useState } from "react";

export function IngestionLayout() {
    const [activeStep, setActiveStep] = useState(-1);

    const NARRATIVE_STEPS = [
        {
            title: "Interrogación Física",
            description: "El microcontrolador ESP32-S3 consulta directamente al DSP dedicado (PZEM004Tv30) vía UART. Se extrae la potencia activa y el voltaje con precisión de hardware, aplicando la calibración física para compensar el factor del transformador.",
            icon: <Cpu className="w-5 h-5" />,
            tech: ["UART", "Modbus-RTU", "DSP"]
        },
        {
            title: "Ensamblaje del Payload",
            description: "No podemos confiar en el tiempo de la nube. El firmware sincroniza su reloj interno contra pool.ntp.org. Luego, convierte los Watts instantáneos a Joules calculando el Delta Time exacto desde el último ciclo.",
            icon: <Clock className="w-5 h-5" />,
            tech: ["NTP", "Epoch UTC", "C++ Math"]
        },
        {
            title: "Redundancia Store-and-Forward",
            description: "Si el enlace Wi-Fi cae o la API rechaza el paquete, el sistema no pierde telemetría. La bandera isOffline se activa y el payload se escribe de forma segura en un archivo CSV dentro de la MicroSD interna.",
            icon: <WifiOff className="w-5 h-5" />,
            tech: ["SD_MMC", "VFS", "Failover"]
        },
        {
            title: "Ingesta Hacia PostgreSQL",
            description: "Al recuperar la conexión, el sistema despacha los paquetes retenidos mediante un HTTP POST seguro hacia las Edge Functions de Supabase. Solo cuando la API responde con un 200 OK, la memoria temporal es liberada.",
            icon: <Database className="w-5 h-5" />,
            tech: ["Edge Functions", "REST API", "PostgreSQL"]
        }
    ];

    return (
        // NUEVO CONTENEDOR PADRE: Apila la cabecera y el contenido de forma vertical
        <div className="flex flex-col w-full max-w-5xl mx-auto pt-0 pb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">

            {/* --- CABECERA DEL ACTO II --- */}
            <div className="mb-16 flex flex-col gap-2 text-center items-center w-full">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mb-2 border border-emerald-500/20">
                    <Database className="w-6 h-6 text-emerald-500" />
                </div>
                <p className="text-sm font-mono text-emerald-500 uppercase tracking-widest">Versión 1.0</p>
                <h2 className="text-3xl font-bold tracking-tight font-sans text-foreground">El Motor de Ingesta</h2>
                <p className="text-muted-foreground text-base max-w-2xl mt-2">
                    Canalización asíncrona y almacenamiento de series temporales. Arquitectura resiliente desde el borde hasta la base de datos relacional, garantizando consistencia y cero pérdida de paquetes.
                </p>
            </div>

            {/* --- CONTENEDOR ORIGINAL DE INGESTA (El que se divide en dos) --- */}
            <div className="relative flex flex-col md:flex-row gap-8 md:gap-12 w-full">

                {/* --- VISTA MÓVIL: Terminal Superior (Sticky Top) --- */}
                <div className="block md:hidden sticky top-20 z-20 w-full mb-4 shadow-2xl">
                    <TerminalStory step={activeStep} />
                </div>

                {/* --- COLUMNA IZQUIERDA: El Narrador (Timeline) --- */}
                <div className="w-full md:w-[45%] flex flex-col pb-16 relative">

                    {/* La línea ahora baja hasta el final de este contenedor (bottom-0) */}
                    <div className="absolute left-[23px] top-4 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-border to-transparent hidden md:block" />

                    {NARRATIVE_STEPS.map((step, index) => {
                        const isActive = activeStep === index;

                        return (
                            <ScrollStep
                                key={index}
                                stepIndex={index}
                                activeStep={activeStep}
                                onStepEnter={setActiveStep}
                            >
                                <div className="flex gap-6 relative">

                                    {/* El "Nodo" del Timeline (Solo Desktop) */}
                                    <div className="hidden md:flex flex-col items-center mt-1 z-10">
                                        <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center bg-background transition-all duration-500 ${isActive
                                            ? "border-emerald-500 text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                                            : "border-slate-300 dark:border-slate-800 text-slate-400 dark:text-slate-600"
                                            }`}>
                                            {step.icon}
                                        </div>
                                    </div>

                                    {/* Contenido del Texto */}
                                    <div className="flex-1 pb-16">
                                        <h3 className={`text-2xl font-semibold tracking-tight mb-3 transition-colors duration-500 flex items-center gap-3 ${isActive ? "text-foreground" : "text-muted-foreground"
                                            }`}>
                                            <span className={`md:hidden p-2 rounded-lg ${isActive ? "bg-emerald-500/10 text-emerald-500" : "bg-muted text-muted-foreground"}`}>
                                                {step.icon}
                                            </span>
                                            {index + 1}. {step.title}
                                        </h3>

                                        <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400 mb-6">
                                            {step.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2">
                                            {step.tech.map((t, i) => (
                                                <Badge
                                                    key={i}
                                                    variant="secondary"
                                                    className={`font-mono text-xs transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-40"
                                                        }`}
                                                >
                                                    {t}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            </ScrollStep>
                        );
                    })}
                </div>

                {/* --- VISTA ESCRITORIO: Terminal Derecha (Sticky) --- */}
                <div className="hidden md:block w-full md:w-[55%] relative">
                    <div className="sticky top-32 h-[60vh] flex items-center justify-center">
                        <TerminalStory step={activeStep} />
                    </div>
                </div>

            </div>
        </div>
    );
}