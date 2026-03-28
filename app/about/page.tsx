import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link"; // Importación del Link de Next.js

// Importaciones del componente Breadcrumb de shadcn/ui
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
    title: "Sobre Mí | Ingeniero de Software & UI/UX",
    description: "Trayectoria, filosofía de diseño y visión de ingeniería.",
};

export default function AboutPage() {
    return (
        // Outer Wrapper
        <main className="w-full min-h-screen flex flex-col items-center px-4 sm:px-8 pt-24 pb-12">

            {/* Inner Wrapper */}
            <article className="w-full max-w-5xl flex flex-col gap-10 md:gap-14">

                {/* Encabezado y Fotografía */}
                <header className="flex flex-col md:flex-row items-start gap-8 justify-between">
                    <div className="flex flex-col gap-4 max-w-2xl">

                        {/* BREADCRUMB: Implementado exactamente igual que en /projects */}
                        <Breadcrumb>
                            <BreadcrumbList className="font-mono text-sm">
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        <Link href="/">Home</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Sobre Mí</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>

                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight font-sans text-foreground">
                            Ingeniería de software con precisión de diseño.
                        </h1>
                        <p className="text-muted-foreground font-mono text-sm uppercase tracking-widest">
                            Frontend Specialist / UI/UX Enthusiast
                        </p>
                    </div>

                    {/* Contenedor de Fotografía */}
                    <div className="relative w-48 h-48 sm:w-40 sm:h-40 self-center md:self-start shrink-0 rounded-2xl overflow-hidden border border-border shadow-sm group">
                        <Image
                            src="/images/ciervo.jpeg"
                            alt="Mi retrato profesional"
                            fill
                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                            sizes="(max-width: 768px) 192px, 160px"
                            priority
                        />
                    </div>
                </header>

                {/* Biografía Narrativa */}
                <section className="flex flex-col gap-6 text-lg leading-relaxed text-neutral-800 dark:text-neutral-300 font-sans w-full">
                    <p>
                        Soy un desarrollador apasionado por la intersección exacta entre el diseño gráfico y la implementación técnica.
                        Mi objetivo y visión a largo plazo es claro: construir y liderar el desarrollo de interfaces UI/UX de talla mundial,
                        ya sea como contribuidor individual o arquitecto de equipo. No me conformo con que las cosas "simplemente funcionen";
                        creo firmemente que la estética, las micro-interacciones y el rendimiento absoluto son características fundamentales del producto.
                    </p>
                    <p>
                        Mi estándar de calidad está profundamente influenciado por el rigor técnico de referentes como Rauno Freiberg, Vercel y Stripe,
                        la dirección de arte inmersiva de Rockstar en GTA VI, los sistemas escalables de Once UI y el impecable scrollytelling de Apple.
                        Esta constante exposición a la excelencia alimenta mis ganas de ser de los mejores, manteniendo una mentalidad de estudiante perpetuo,
                        con bases sólidas y una determinación inquebrantable por seguir aprendiendo hasta lograrlo.
                    </p>
                    <p>
                        Actualmente, canalizo esta energía en construir herramientas y ecosistemas digitales robustos.
                        Cada línea de código que escribo es un paso más hacia la maestría técnica, buscando siempre ese balance perfecto
                        donde la complejidad de la lógica de negocio se vuelve invisible gracias a una experiencia de usuario impecable, rápida y fluida.
                    </p>
                </section>

                {/* Sección de Trayectoria */}
                <section className="flex flex-col gap-8 w-full">
                    <h2 className="text-2xl font-semibold border-b border-border pb-4 font-sans text-foreground">
                        Trayectoria
                    </h2>

                    <div className="flex flex-col gap-10 mt-4">
                        <ExperienceItem
                            company="PowerLink"
                            role="Lead Frontend Engineer"
                            period="2023 — Presente"
                            description="Desarrollo de interfaces de alta fidelidad para el monitoreo de hardware IoT en tiempo real. Implementación de modelos 3D interactivos, arquitecturas modulares y visualización de topologías de red priorizando el rendimiento a 60fps."
                        />
                    </div>
                </section>

            </article>
        </main>
    );
}

// Sub-componente 
function ExperienceItem({ company, role, period, description }: {
    company: string, role: string, period: string, description: string
}) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-2 md:gap-8 group">
            <div className="text-sm font-mono text-muted-foreground md:pt-1">{period}</div>

            <div className="flex flex-col gap-2">
                <Link href={`/projects/${company.replace(" ", "-")}`} className="text-xl font-semibold text-foreground font-sans transition-colors group-hover:text-blue-500">
                    {company}
                </Link>
                <p className="text-sm font-mono text-muted-foreground uppercase tracking-wide">{role}</p>
                <p className="text-lg leading-relaxed text-neutral-600 dark:text-neutral-400 font-sans mt-2">
                    {description}
                </p>
            </div>
        </div>
    );
}