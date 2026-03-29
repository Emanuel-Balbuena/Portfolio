import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link"; // Importación del Link de Next.js
import { useTranslations } from "next-intl";

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
    title: "Sobre Mí | Ciervo",
    description: "Trayectoria, filosofía de diseño y visión de ingeniería.",
};

export default function AboutPage() {
    const tBreadcrumbs = useTranslations("Breadcrumbs");
    const t = useTranslations("About");

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
                                        <Link href="/">{tBreadcrumbs("home")}</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{tBreadcrumbs("about")}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>

                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight font-sans text-foreground">
                            {t("title")}
                        </h1>
                        <p className="text-muted-foreground font-mono text-sm uppercase tracking-widest">
                            {t("subtitle")}
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
                    <p>{t("bio1")}</p>
                    <p>{t("bio2")}</p>
                    <p>{t("bio3")}</p>
                </section>

                {/* Sección de Trayectoria */}
                <section className="flex flex-col gap-8 w-full">
                    <h2 className="text-2xl font-semibold border-b border-border pb-4 font-sans text-foreground">
                        {t("trajectory")}
                    </h2>

                    <div className="flex flex-col gap-10 mt-4">
                        <ExperienceItem
                            company="PowerLink"
                            role="Lead Frontend Engineer"
                            period={`2023 — ${t("present")}`}
                            description={t("powerlinkDesc")}
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