"use client"

import {
    Cpu,
    Search,
    Settings,
    ShieldCheck,
    Terminal
} from "lucide-react";
import { useTheme } from "next-themes"; // <-- IMPORTANTE: Importamos el hook
import { useRouter } from "next/navigation";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

export function CommandMenu() {
    const [open, setOpen] = React.useState(false)
    const router = useRouter()
    const { theme, setTheme } = useTheme() // <-- Consumimos el contexto del tema

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            // Atajo para abrir el menú (⌘K)
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
            // NUEVO: Atajo para cambiar el tema (⌘T)
            // Solo funciona si el usuario no está escribiendo en un input
            if (e.key === "t" && e.altKey) {
                e.preventDefault()
                setTheme(theme === "dark" ? "light" : "dark")
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [theme, setTheme]) // Añadimos dependencias por buenas prácticas

    const runCommand = (command: () => void) => {
        setOpen(false)
        command()
    }

    return (
        <>
            <Button
                variant="outline"
                className="relative h-9 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64"
                onClick={() => setOpen(true)}
            >
                <Search className="mr-2 h-4 w-4" />
                <span className="hidden lg:inline-flex">Buscar comandos...</span>
                <span className="inline-flex lg:hidden">Buscar...</span>
                <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="overflow-hidden p-0 shadow-lg border-border">
                    <DialogTitle className="sr-only">Paleta de Comandos</DialogTitle>
                    <DialogDescription className="sr-only">
                        Navega por el portafolio, proyectos y configuraciones del sistema.
                    </DialogDescription>

                    <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
                        <CommandInput placeholder="Escribe un comando o busca algo..." />
                        <CommandList className="font-sans">
                            <CommandEmpty>No se encontraron resultados.</CommandEmpty>
                            <CommandGroup heading="Ingeniería & Proyectos">
                                <CommandItem onSelect={() => runCommand(() => router.push('/projects/powerlink'))}>
                                    <Cpu className="mr-2 h-4 w-4" />
                                    <span>IoT Powerlink (Telemetría)</span>
                                </CommandItem>
                                <CommandItem onSelect={() => runCommand(() => router.push('/blog/pci-dss-framework'))}>
                                    <ShieldCheck className="mr-2 h-4 w-4" />
                                    <span>Notas: Framework PCI DSS</span>
                                </CommandItem>
                            </CommandGroup>
                            <CommandSeparator />
                            <CommandGroup heading="Sistema">
                                <CommandItem onSelect={() => runCommand(() => router.push('/blog/arch-hyprland-setup'))}>
                                    <Terminal className="mr-2 h-4 w-4" />
                                    <span>Dotfiles & Entorno</span>
                                    <CommandShortcut>⌘D</CommandShortcut>
                                </CommandItem>
                                <CommandItem onSelect={() => runCommand(() => setTheme(theme === "dark" ? "light" : "dark"))}>
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>Alternar Tema</span>
                                    {/* Actualizamos la etiqueta visual */}
                                    <CommandShortcut>Alt+T</CommandShortcut>
                                </CommandItem>
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </DialogContent>
            </Dialog>
        </>
    )
}