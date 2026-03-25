// components/terminal-story.tsx

"use client";

import { useEffect, useState } from "react";

interface TerminalStoryProps {
    step: number;
}

// Nuestro "Diccionario de Datos" con las trazas exactas basadas en tu arquitectura
const TERMINAL_LOGS = [
    // Paso 0: Interrogación Física
    [
        "> _ uart: TX -> F8 04 00 00 00 0A 64 64",
        "> _ uart: RX <- F8 04 14 09 4B 00 00 00 8C 00 00 00 00 01 F4 00 64 00 00 00 00 E5",
        "> _ dsp: Analizando trama Modbus-RTU...",
        "> _ calc: Aplicando calibrador de hardware (x10.0)...",
        "> _ sys: [OK] Voltaje: 121.5V | Potencia Activa: 14.0W"
    ],
    // Paso 1: Ensamblaje del Payload
    [
        "> _ ntp: Solicitando Epoch UTC a pool.ntp.org...",
        "> _ ntp: [OK] Timestamp: 2026-03-24T16:30:00.000Z",
        "> _ core: DeltaTime desde último ciclo: 300000 ms",
        "> _ core: Integrando Potencia -> Energía (Joules)...",
        "> _ sys: Ensamblando payload JSON:",
        "{\n  \"id_hardware\": \"A0:B7:65:DD:FE:12\",\n  \"timestamp\": \"2026-03-24T16:30:00.000Z\",\n  \"kwh_consumed\": 0.015\n}"
    ],
    // Paso 2: Store-and-Forward
    [
        "> _ http: Iniciando túnel SSL/TLS con Supabase...",
        "> _ http: POST /functions/v1/ingest",
        "> _ sys: Esperando respuesta...",
        "> _ err: [TIMEOUT] Conexión rechazada. Link Wi-Fi inestable.",
        "> _ sys: Activando bandera de contingencia (isOffline = true)",
        "> _ fs: Montando sistema de archivos SD_MMC...",
        "> _ fs: [OK] Appending a /data.csv"
    ],
    // Paso 3: Ingesta Hacia PostgreSQL
    [
        "> _ sys: Link Wi-Fi recuperado. Sincronizando pendientes...",
        "> _ fs: Leyendo /data.csv (1 paquete retenido)",
        "> _ http: POST /functions/v1/ingest",
        "> _ sys: [200 OK] Paquete insertado en public.lecturas_consumo",
        "> _ fs: Eliminando /data.csv para liberar NVS...",
        "> _ sys: [OK] Sincronización completa. Retornando a nominal."
    ]
];

export function TerminalStory({ step }: TerminalStoryProps) {
    const [visibleLines, setVisibleLines] = useState<string[]>([]);

    // Efecto de "Máquina de escribir" para las líneas
    useEffect(() => {
        // 1. Limpiamos la terminal cuando cambiamos de paso
        setVisibleLines([]);

        if (step === -1) {
            setVisibleLines([
                "> _ sys: Inicializando módulo de telemetría...",
                "> _ sys: [STANDBY] Esperando enlace de datos (Scroll hacia abajo para iniciar)..."
            ]);
            return; // Detenemos la ejecución aquí para no buscar en el array
        }

        const currentLogs = TERMINAL_LOGS[step] || [];
        let timeouts: NodeJS.Timeout[] = [];

        // 2. Programamos la aparición de cada línea con un retraso progresivo
        currentLogs.forEach((line, index) => {
            // Retraso base de 300ms entre cada línea
            const delay = index * 300 + 100;

            const timeout = setTimeout(() => {
                setVisibleLines((prev) => [...prev, line]);
            }, delay);

            timeouts.push(timeout);
        });

        // 3. Cleanup: Si el usuario hace scroll muy rápido, cancelamos los timeouts pendientes
        return () => {
            timeouts.forEach(clearTimeout);
        };
    }, [step]); // Se vuelve a ejecutar cada vez que cambia el 'step'

    return (
        <div className="w-full max-w-2xl h-[350px] md:h-[450px] flex flex-col rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#080808] shadow-2xl overflow-hidden font-mono text-sm text-slate-600 dark:text-slate-400">

            {/* Cabecera de la ventana (Window Chrome) clonada de tu original */}
            <div className="flex items-center px-4 py-3 bg-slate-50 dark:bg-[#0f0f0f] border-b border-slate-200 dark:border-slate-800/50 shrink-0">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700/50"></div>
                    <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700/50"></div>
                    <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700/50"></div>
                </div>
                <div className="mx-auto text-slate-500 text-xs">firmware@esp32-s3: ~/ingest-flow</div>
            </div>

            {/* Área de salida de la consola */}
            <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-2">
                {visibleLines.map((line, i) => {
                    // Lógica simple para darle colores a palabras clave (Alta Ingeniería)
                    const isError = line.includes("[TIMEOUT]") || line.includes("err:");
                    const isSuccess = line.includes("[OK]") || line.includes("[200 OK]");
                    const isJson = line.startsWith("{");

                    return (
                        <div
                            key={i}
                            className={`whitespace-pre-wrap ${isError ? "text-red-500 dark:text-red-400" :
                                isSuccess ? "text-emerald-600 dark:text-emerald-400" :
                                    isJson ? "text-blue-600 dark:text-blue-400 mt-2" : ""
                                }`}
                        >
                            {line}
                        </div>
                    );
                })}
                {/* El cursor parpadeante al final */}
                <div className="w-2 h-4 bg-slate-400 dark:bg-slate-500 animate-pulse mt-1"></div>
            </div>
        </div>
    );
}