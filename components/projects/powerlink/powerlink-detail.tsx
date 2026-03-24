// components/projects/powerlink-detail.tsx
"use client";

// Asegúrate de que la ruta de importación coincida con donde guardaste el componente
import { PowerLinkHero3D } from "@/components/projects/powerlink/hero-3d";

export function PowerLinkDetail() {
    return (
        <div className="flex flex-col gap-16 pb-20 animate-in fade-in duration-700">

            {/* ACTO I: El Origen Físico (Modelo 3D Interactuable) */}
            <section>
                <PowerLinkHero3D />
            </section>

            {/* Placeholder temporal para el Acto II */}
            <section className="p-8 border border-border bg-card rounded-xl shadow-sm max-w-3xl mx-auto w-full">
                <h2 className="text-2xl font-mono text-primary mb-4 flex items-center gap-2">
                    <span className="text-muted-foreground">~/</span>
                    Actos_Pendientes
                </h2>
                <p className="text-muted-foreground mb-4">
                    La calibración 3D está en proceso. Siguientes pasos en la arquitectura:
                </p>
                <ul className="list-disc list-inside text-sm text-muted-foreground font-mono space-y-2">
                    <li>Acto II: Scrollytelling de Ingesta (Red)</li>
                    <li>Acto III: Panel de Telemetría (Supabase)</li>
                </ul>
            </section>

        </div>
    );
}