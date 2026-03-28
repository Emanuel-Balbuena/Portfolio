"use client"

import {
    FolderOpen,
    Github,
    Globe,
    Home,
    LinkIcon,
    Linkedin,
    Mail,
    Monitor,
    Search,
    Settings,
    User
} from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "sonner";

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
import { PROJECTS } from "@/lib/projects";

export function CommandMenu() {
    const [open, setOpen] = React.useState(false)
    const router = useRouter()
    const { theme, setTheme } = useTheme()
    const [isCopied, setIsCopied] = React.useState(false);
    const email = "[EMAIL_ADDRESS]";

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
            if (e.key === "t" && e.altKey) {
                e.preventDefault()
                setTheme(theme === "dark" ? "light" : "dark")
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [theme, setTheme])

    const runCommand = (command: () => void) => {
        setOpen(false)
        command()
    }

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(email);
            setIsCopied(true);
            // Utilizamos la variante .success de Sonner para una mejor UI
            toast.success("Correo copiado al portapapeles", {
                description: "¡Hablemos de tu próximo proyecto!",
            });
            // Restauramos el icono original después de 2 segundos
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            toast.error("Error de acceso", {
                description: "No se pudo acceder al portapapeles. Intenta seleccionarlo manualmente.",
            });
        }
    };

    const linkCopy = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setIsCopied(true);
            toast.success("Enlace copiado al portapapeles", {
                description: "¡Listo para compartir!",
            });
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            toast.error("Error de acceso", {
                description: "No se pudo acceder al portapapeles. Intenta seleccionarlo manualmente.",
            });
        }
    };

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
                <DialogContent
                    className="overflow-hidden p-0 shadow-lg border-border"
                    onOpenAutoFocus={(e) => {
                        if (window.innerWidth < 768) {
                            e.preventDefault();
                        }
                    }}
                >
                    <DialogTitle className="sr-only">Paleta de Comandos</DialogTitle>
                    <DialogDescription className="sr-only">
                        Navega por el portafolio, proyectos y configuraciones del sistema.
                    </DialogDescription>

                    <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
                        <CommandInput placeholder="Escribe un comando o busca algo..." />
                        <CommandList className="font-sans">
                            <CommandEmpty>No se encontraron resultados.</CommandEmpty>

                            <CommandGroup heading="Navegación">
                                <CommandItem onSelect={() => runCommand(() => router.push('/'))}>
                                    <Home className="mr-2 h-4 w-4" />
                                    <span>Inicio</span>
                                </CommandItem>
                                <CommandItem onSelect={() => runCommand(() => router.push('/about'))}>
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Sobre Mí</span>
                                </CommandItem>
                                <CommandItem onSelect={() => runCommand(() => router.push('/projects'))}>
                                    <FolderOpen className="mr-2 h-4 w-4" />
                                    <span>Ver Proyectos</span>
                                </CommandItem>
                            </CommandGroup>
                            <CommandSeparator />

                            <CommandGroup heading="Acciones Rápidas">
                                <CommandItem onSelect={() => runCommand(() => handleCopy())}>
                                    <Mail className="mr-2 h-4 w-4" />
                                    <span>Copiar Email</span>
                                </CommandItem>
                                <CommandItem onSelect={() => runCommand(() => linkCopy())}>
                                    <LinkIcon className="mr-2 h-4 w-4" />
                                    <span>Copiar Enlace Actual</span>
                                </CommandItem>
                            </CommandGroup>
                            <CommandSeparator />

                            <CommandGroup heading="Proyectos">
                                {PROJECTS.map((project) => (
                                    <CommandItem key={project.id} onSelect={() => runCommand(() => router.push(`/projects/${project.name}`))}>
                                        <Monitor className="mr-2 h-4 w-4" />
                                        <span>{project.title}</span>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                            <CommandSeparator />

                            <CommandGroup heading="Redes & Contacto">
                                <CommandItem onSelect={() => runCommand(() => window.open('https://github.com/Emanuel-Balbuena', '_blank'))}>
                                    <Github className="mr-2 h-4 w-4" />
                                    <span>GitHub</span>
                                </CommandItem>
                                <CommandItem onSelect={() => runCommand(() => window.open('https://www.linkedin.com/in/emanuel-balbuena-ciervo/', '_blank'))}>
                                    <Linkedin className="mr-2 h-4 w-4" />
                                    <span>LinkedIn</span>
                                </CommandItem>
                            </CommandGroup>
                            <CommandSeparator />

                            <CommandGroup heading="Preferencias">
                                <CommandItem onSelect={() => runCommand(() => setTheme(theme === "dark" ? "light" : "dark"))}>
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>Alternar Tema</span>
                                    <CommandShortcut>Alt+T</CommandShortcut>
                                </CommandItem>
                                <CommandItem onSelect={() => runCommand(() => toast("Multi-idioma (i18n) estará disponible próximamente."))} disabled>
                                    <Globe className="mr-2 h-4 w-4 opacity-50" />
                                    <span className="text-muted-foreground">Cambiar Idioma (Pronto)</span>
                                </CommandItem>
                            </CommandGroup>

                        </CommandList>
                    </Command>
                </DialogContent>
            </Dialog>
        </>
    )
}