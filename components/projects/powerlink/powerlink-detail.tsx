// components/projects/powerlink-detail.tsx
"use client";

// Asegúrate de que la ruta de importación coincida con donde guardaste el componente
import { PowerLinkHero3D } from "@/components/projects/powerlink/hero-3d";
import { IngestionLayout } from "@/components/projects/powerlink/ingest-layout";
import { PowerLinkArchitecture } from "./architecture";
import { PowerLinkExecutive } from "./executive-summary";
import { PowerLinkSecurity } from "./security";

export function PowerLinkDetail() {
    return (
        <div className="flex flex-col gap-16 pb-20 animate-in fade-in duration-700">
            {/* ACTO 0: Resumen Ejecutivo */}
            <section>
                <PowerLinkExecutive />
            </section>

            {/* ACTO III: El Blueprint de Sistemas (Tabs Interactivos) */}
            <section className="w-full">
                <PowerLinkArchitecture />
            </section>

            {/* ACTO I: El Origen Físico (Modelo 3D Interactuable) */}
            <section>
                <PowerLinkHero3D />
            </section>

            {/* ACTO II: La Arquitectura de Datos (Scrollytelling) */}
            <section className="w-full">
                <IngestionLayout />
            </section>

            {/* ACTO IV: Ciberseguridad y Resiliencia */}
            <section className="w-full">
                <PowerLinkSecurity />
            </section>

        </div>
    );
}