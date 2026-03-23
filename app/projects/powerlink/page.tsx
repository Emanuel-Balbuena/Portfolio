import { Activity, Cpu, Server, Wifi } from "lucide-react"
import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// ============================================================================
// COMPONENTE HIJO: SystemNode
// Este es un componente de React que acepta "Props". Aisla la lógica visual
// de un nodo individual para mantener nuestro código DRY (Don't Repeat Yourself).
// ============================================================================
interface SystemNodeProps {
    title: string
    subtitle: string
    icon: React.ReactNode
    status: "online" | "offline" | "secure"
    codeSnippet: string
    telemetryData: string
}

function SystemNode({ title, subtitle, icon, status, codeSnippet, telemetryData }: SystemNodeProps) {
    // Un diccionario simple para los colores de estado
    const statusColors = {
        online: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
        offline: "bg-red-500/10 text-red-500 border-red-500/20",
        secure: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    }

    return (
        <HoverCard>
            {/* El Trigger es el botón o área que el usuario pasa por encima */}
            <HoverCardTrigger asChild>
                <div className="flex cursor-crosshair flex-col items-center justify-center gap-3 rounded-xl border border-border bg-background/50 p-6 shadow-sm transition-all hover:border-foreground/30 hover:bg-muted/50 supports-[backdrop-filter]:backdrop-blur-md">
                    <div className="rounded-full bg-foreground/5 p-4 text-foreground">
                        {icon}
                    </div>
                    <div className="text-center">
                        <h3 className="font-mono text-sm font-bold tracking-tight">{title}</h3>
                        <p className="text-xs text-muted-foreground">{subtitle}</p>
                    </div>
                    <Badge variant="outline" className={`font-mono text-[10px] uppercase ${statusColors[status]}`}>
                        {status}
                    </Badge>
                </div>
            </HoverCardTrigger>

            {/* El Content es el panel de cristal que se revela */}
            <HoverCardContent
                side="bottom"
                className="w-80 border-border bg-background/90 p-0 shadow-xl backdrop-blur-xl"
            >
                <Tabs defaultValue="specs" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 rounded-none border-b border-border bg-transparent p-0">
                        <TabsTrigger value="specs" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-foreground data-[state=active]:shadow-none">
                            Especificaciones
                        </TabsTrigger>
                        <TabsTrigger value="code" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-foreground data-[state=active]:shadow-none">
                            Config / Código
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="specs" className="p-4 text-sm">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between border-b border-border pb-2">
                                <span className="text-muted-foreground">Protocolo</span>
                                <span className="font-mono font-medium">MQTT / TLS</span>
                            </div>
                            <div className="flex items-center justify-between pb-1">
                                <span className="text-muted-foreground">Última lectura</span>
                                <span className="font-mono flex items-center gap-1 text-emerald-500">
                                    <Activity className="size-3" /> {telemetryData}
                                </span>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="code" className="p-4">
                        <div className="rounded-md border border-border bg-muted/50 p-3">
                            <pre className="font-mono text-xs text-muted-foreground overflow-x-auto">
                                <code>{codeSnippet}</code>
                            </pre>
                        </div>
                    </TabsContent>
                </Tabs>
            </HoverCardContent>
        </HoverCard>
    )
}

// ============================================================================
// COMPONENTE PADRE: Página de Arquitectura
// Este es un Server Component por defecto en Next.js. Orquesta la página completa.
// ============================================================================
export default function PowerlinkArchitecturePage() {
    return (
        <div className="container mx-auto max-w-5xl py-24 px-4 sm:px-8">
            <div className="mb-12 flex flex-col gap-4">
                <Badge className="w-fit bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 font-mono">
                    PROYECTO DESTACADO
                </Badge>
                <h1 className="font-sans text-4xl font-bold tracking-tighter sm:text-5xl">
                    Powerlink IoT Gateway
                </h1>
                <p className="max-w-2xl text-lg text-muted-foreground">
                    Sistema de telemetría energética en tiempo real. Arquitectura distribuida con edge-computing y transmisión segura de datos a través de protocolos ligeros.
                </p>
            </div>

            <Card className="border-border bg-transparent shadow-none">
                <CardHeader className="border-b border-border pb-6">
                    <CardTitle className="font-mono text-sm uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                        <Server className="size-4" />
                        Topología del Sistema
                    </CardTitle>
                    <CardDescription>
                        Pasa el cursor sobre los nodos interactivos para inspeccionar los componentes de hardware, fragmentos de configuración y métricas en tiempo real.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-8 sm:p-12">
                    {/* 
            Contenedor Grid para simular el flujo de la arquitectura.
            En pantallas pequeñas es una columna, en grandes se expande a 3.
          */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative items-center">

                        {/* Línea conectora (visible solo en desktop para unir los nodos) */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-border -z-10" />

                        <SystemNode
                            title="PZEM-004T V3"
                            subtitle="Sensor Analítico"
                            icon={<Activity className="size-8" />}
                            status="online"
                            telemetryData="220.5V | 1.2A"
                            codeSnippet={`// Lectura Serial\nfloat voltage = pzem.voltage();\nif(!isnan(voltage)){\n  Serial.print(voltage);\n}`}
                        />

                        <SystemNode
                            title="ESP32 Edge Node"
                            subtitle="Microcontrolador"
                            icon={<Cpu className="size-8" />}
                            status="secure"
                            telemetryData="CPU: 45°C | RAM: 60%"
                            codeSnippet={`// Tareas FreeRTOS\nxTaskCreatePinnedToCore(\n  TelemetryTask,\n  "Telemetry",\n  10000,\n  NULL, 1, NULL, 0);`}
                        />

                        <SystemNode
                            title="Broker & Dashboard"
                            subtitle="Vercel / AWS"
                            icon={<Wifi className="size-8" />}
                            status="online"
                            telemetryData="Latencia: 12ms"
                            codeSnippet={`// Subscripción MQTT\nclient.on('message', \n  (topic, message) => {\n  updateMetrics(message);\n});`}
                        />

                    </div>
                </CardContent>
            </Card>
        </div>
    )
}