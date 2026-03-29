// components/connect.tsx

"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export function Connect() {
    const [isCopied, setIsCopied] = useState(false);
    const email = "[EMAIL_ADDRESS]";
    const t = useTranslations("Connect");

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(email);
            setIsCopied(true);
            // Utilizamos la variante .success de Sonner para una mejor UI
            toast.success(t("toastCopySuccess"), {
                description: t("toastCopySuccessDesc"),
            });
            // Restauramos el icono original después de 2 segundos
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            toast.error(t("toastCopyError"), {
                description: t("toastCopyErrorDesc"),
            });
        }
    };

    return (
        // Outer Wrapper: Respeta el estándar de contención y espaciado de tu arquitectura
        <section className="w-full flex flex-col items-center px-4 sm:px-8 py-24 border-t border-border bg-background relative overflow-hidden">

            {/* Glow ambiental sutil centrado en la sección */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/5 dark:bg-blue-500/10 blur-[120px] pointer-events-none -z-10 rounded-full" />

            {/* Inner Wrapper: Límite estricto de 1024px */}
            <div className="w-full max-w-5xl flex flex-col items-center text-center space-y-8">

                <div className="space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight font-sans text-foreground">
                        {t("title")}
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-xl mx-auto font-sans">
                        {t("description")}
                    </p>
                </div>

                {/* Tarjeta de Contacto Principal (Glassmorphism + Border) */}
                <div className="flex flex-col sm:flex-row items-center gap-3 p-2 rounded-2xl border border-border bg-background/50 backdrop-blur-md shadow-sm">
                    <div className="flex items-center gap-3 px-4 py-3 sm:py-2">
                        <Mail className="size-5 text-muted-foreground" />
                        <span className="font-mono text-sm font-medium text-foreground select-all">
                            {email}
                        </span>
                    </div>

                    <Button
                        onClick={handleCopy}
                        variant="secondary"
                        className="w-full sm:w-auto rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                    >
                        {isCopied ? (
                            <Check className="size-4 mr-2 text-green-500" />
                        ) : (
                            <Copy className="size-4 mr-2" />
                        )}
                        {isCopied ? t("copiedBtn") : t("copyBtn")}
                    </Button>
                </div>

                {/* Enlaces Sociales de Alta Ingeniería */}
                <div className="flex items-center gap-6 pt-8">
                    <Link
                        href="https://github.com/Emanuel-Balbuena"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <Github className="size-4" />
                        <span className="font-sans">GitHub</span>
                        <ArrowUpRight className="size-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>

                    <div className="w-1 h-1 rounded-full bg-border" /> {/* Separador minimalista */}

                    <Link
                        href="https://www.linkedin.com/in/emanuel-balbuena-ciervo/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <Linkedin className="size-4" />
                        <span className="font-sans">LinkedIn</span>
                        <ArrowUpRight className="size-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                </div>

            </div>
        </section>
    );
}  