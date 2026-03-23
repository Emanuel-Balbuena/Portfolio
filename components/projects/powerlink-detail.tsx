// components/projects/powerlink-detail.tsx
import { Activity, TerminalSquare } from "lucide-react";

export function PowerLinkDetail() {
    // === FEATURE FLAG (Tu variable rápida) ===
    // Cambia esto a `false` cuando quieras empezar a construir el diagrama real
    const IS_DRAFT = false;

    if (IS_DRAFT) {
        return (
            <div className="w-full flex flex-col items-center justify-center py-24 border border-border/50 bg-background rounded-2xl relative overflow-hidden group shadow-sm">
                {/* Efecto Glow técnico de fondo */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center text-center space-y-8">

                    {/* Animación Interactiva/Visual */}
                    <div className="relative w-32 h-32 flex items-center justify-center">
                        {/* Anillos de "compilación" */}
                        <div className="absolute inset-0 border-[0.5px] border-blue-500/30 rounded-full animate-[spin_4s_linear_infinite]" />
                        <div className="absolute inset-4 border-[0.5px] border-dashed border-blue-500/40 rounded-full animate-[spin_6s_linear_infinite_reverse]" />
                        <div className="absolute inset-8 border-[0.5px] border-border rounded-full" />

                        {/* Núcleo */}
                        <div className="w-12 h-12 bg-muted/30 backdrop-blur-sm border border-border rounded-lg flex items-center justify-center shadow-inner relative z-10">
                            <TerminalSquare className="w-5 h-5 text-blue-400 animate-pulse" />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-2xl font-bold tracking-tight font-sans">Compilando Documentación</h3>
                        <p className="text-muted-foreground font-mono text-sm max-w-md mx-auto leading-relaxed">
                    // Los diagramas de arquitectura, esquemas de hardware y bloques de código interactivos para este módulo están siendo redactados.
                        </p>
                    </div>

                    {/* Consola simulada interactuable (estética) */}
                    <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 bg-zinc-950/50 px-4 py-2.5 rounded-md border border-zinc-800/50 shadow-sm w-full max-w-xs">
                        <Activity className="w-4 h-4 text-blue-500" />
                        <span className="flex-1 text-left">ESTADO: PAGE_DRAFT</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    </div>
                </div>
            </div>
        );
    }

    // === RENDERIZADO REAL (Cuando IS_DRAFT sea false) ===
    return (
        <div className="space-y-12 animate-in fade-in duration-700">
            {/* Aquí irá el contenido final: Diagramas, Tabs, Código */}
            <div className="p-6 border border-border bg-card rounded-xl shadow-sm">
                <h2 className="text-2xl font-mono text-primary mb-4">
                    Arquitectura PowerLink Finalizada
                </h2>
                <p className="text-muted-foreground">
                    El componente real está listo para ser desarrollado.
                </p>
            </div>
        </div>
    );
}