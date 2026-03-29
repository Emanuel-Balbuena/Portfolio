// components/terminal-story.tsx

"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

interface TerminalStoryProps {
    step: number;
}

export function TerminalStory({ step }: TerminalStoryProps) {
    const [visibleLines, setVisibleLines] = useState<string[]>([]);
    const t = useTranslations("TerminalStory");

    // Efecto de "Máquina de escribir" para las líneas
    useEffect(() => {
        // 1. Limpiamos la terminal cuando cambiamos de paso
        setVisibleLines([]);

        if (step === -1) {
            setVisibleLines([
                t("step_init_0"),
                t("step_init_1")
            ]);
            return; // Detenemos la ejecución aquí para no buscar en el array
        }

        const getLogsForStep = (s: number) => {
           if (s === 0) return [t("step_0_0"), t("step_0_1"), t("step_0_2"), t("step_0_3"), t("step_0_4")];
           if (s === 1) return [t("step_1_0"), t("step_1_1"), t("step_1_2"), t("step_1_3"), t("step_1_4"), t("step_1_5")];
           if (s === 2) return [t("step_2_0"), t("step_2_1"), t("step_2_2"), t("step_2_3"), t("step_2_4"), t("step_2_5"), t("step_2_6")];
           if (s === 3) return [t("step_3_0"), t("step_3_1"), t("step_3_2"), t("step_3_3"), t("step_3_4"), t("step_3_5")];
           return [];
        };

        const currentLogs = getLogsForStep(step);
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
    }, [step, t]); // Se vuelve a ejecutar cada vez que cambia el 'step'

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