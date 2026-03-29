// components/projects/powerlink/security.tsx

"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Cpu, Fingerprint, GlobeLock, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";

export function PowerLinkSecurity() {
    const t = useTranslations("PowerLink.Security");
    return (
        <div className="flex flex-col w-full max-w-5xl mx-auto pt-0 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-1000">

            {/* Cabecera de la Sección */}
            <div className="mb-10 flex flex-col gap-2 text-center items-center">
                <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mb-2 border border-amber-500/20">
                    <ShieldCheck className="w-6 h-6 text-amber-500" />
                </div>
                <p className="text-sm font-mono text-amber-500 uppercase tracking-widest">{t("badge")}</p>
                <h2 className="text-3xl font-bold tracking-tight font-sans text-foreground">{t("title")}</h2>
                <p className="text-muted-foreground text-base max-w-2xl mt-2">
                    {t("description")}
                </p>
            </div>

            {/* Contenedor de la Bóveda */}
            <Card className="w-full bg-background/80 backdrop-blur-sm border-border shadow-sm overflow-hidden relative">
                {/* Patrón visual de seguridad (huella digital / grid sutil) */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

                <div className="p-6 md:p-8 relative z-10">
                    <Accordion type="single" collapsible className="w-full space-y-4">

                        {/* --- CAPA 1: HARDWARE --- */}
                        <AccordionItem value="item-1" className="border border-border rounded-lg bg-card/50 px-4 transition-all hover:border-amber-500/30 data-[state=open]:border-amber-500/50 data-[state=open]:bg-amber-500/5">
                            <AccordionTrigger className="hover:no-underline py-4">
                                <div className="flex items-center gap-4 text-left">
                                    <div className="p-2 rounded-md bg-slate-100 dark:bg-slate-900 text-slate-500">
                                        <Cpu className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-base font-semibold font-sans">{t("layer1.title")}</h4>
                                        <p className="text-sm text-muted-foreground font-normal mt-0.5 hidden sm:block">{t("layer1.subtitle")}</p>
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pt-2 pb-6">
                                <div className="pl-14 border-l-2 border-border ml-6 space-y-4">
                                    <p className="text-base text-muted-foreground leading-relaxed">
                                        {t("layer1.description")}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        <Badge variant="outline" className="font-mono text-xs border-amber-500/20 text-amber-600 dark:text-amber-400">NVS Encryption</Badge>
                                        <Badge variant="outline" className="font-mono text-xs">Captive Portal</Badge>
                                        <Badge variant="outline" className="font-mono text-xs">Watchdog Timer</Badge>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        {/* --- CAPA 2: TRANSPORTE --- */}
                        <AccordionItem value="item-2" className="border border-border rounded-lg bg-card/50 px-4 transition-all hover:border-amber-500/30 data-[state=open]:border-amber-500/50 data-[state=open]:bg-amber-500/5">
                            <AccordionTrigger className="hover:no-underline py-4">
                                <div className="flex items-center gap-4 text-left">
                                    <div className="p-2 rounded-md bg-slate-100 dark:bg-slate-900 text-slate-500">
                                        <GlobeLock className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-base font-semibold font-sans">{t("layer2.title")}</h4>
                                        <p className="text-sm text-muted-foreground font-normal mt-0.5 hidden sm:block">{t("layer2.subtitle")}</p>
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pt-2 pb-6">
                                <div className="pl-14 border-l-2 border-border ml-6 space-y-4">
                                    <p className="text-base text-muted-foreground leading-relaxed">
                                        {t("layer2.description")}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        <Badge variant="outline" className="font-mono text-xs border-amber-500/20 text-amber-600 dark:text-amber-400">TLS 1.3</Badge>
                                        <Badge variant="outline" className="font-mono text-xs">HMAC-SHA256</Badge>
                                        <Badge variant="outline" className="font-mono text-xs">SSL Pinning</Badge>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        {/* --- CAPA 3: CLOUD & API --- */}
                        <AccordionItem value="item-3" className="border border-border rounded-lg bg-card/50 px-4 transition-all hover:border-amber-500/30 data-[state=open]:border-amber-500/50 data-[state=open]:bg-amber-500/5">
                            <AccordionTrigger className="hover:no-underline py-4">
                                <div className="flex items-center gap-4 text-left">
                                    <div className="p-2 rounded-md bg-slate-100 dark:bg-slate-900 text-slate-500">
                                        <Fingerprint className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-base font-semibold font-sans">{t("layer3.title")}</h4>
                                        <p className="text-sm text-muted-foreground font-normal mt-0.5 hidden sm:block">{t("layer3.subtitle")}</p>
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pt-2 pb-6">
                                <div className="pl-14 border-l-2 border-border ml-6 space-y-4">
                                    <p className="text-base text-muted-foreground leading-relaxed">
                                        {t("layer3.description")}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        <Badge variant="outline" className="font-mono text-xs border-amber-500/20 text-amber-600 dark:text-amber-400">PostgreSQL RLS</Badge>
                                        <Badge variant="outline" className="font-mono text-xs">JWT Auth</Badge>
                                        <Badge variant="outline" className="font-mono text-xs">Middleware Protection</Badge>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                    </Accordion>
                </div>
            </Card>
        </div>
    );
}