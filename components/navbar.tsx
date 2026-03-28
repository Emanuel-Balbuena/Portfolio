"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import * as React from "react";

// Importamos el CommandMenu que construimos previamente
import { CommandMenu } from "@/components/command-menu";

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm supports-[backdrop-filter]:bg-background/60"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="container mx-auto flex h-14 items-center justify-between px-4 sm:px-8">

        {/* =========================================
            BLOQUE IZQUIERDO: Logo + Nav Desktop
        ========================================= */}
        <div className="flex items-center gap-6 md:gap-8">
          {/* LOGO */}
          <Link href="/" className="font-mono font-bold tracking-tighter flex items-center gap-2">
            ~/ciervo
          </Link>

          {/* NAVEGACIÓN DESKTOP */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList className="gap-2">
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/projects" className="px-4 py-2 text-sm font-medium transition-colors rounded-md hover:bg-foreground/10">
                      Proyectos
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/blog" className="px-4 py-2 text-sm font-medium transition-colors rounded-md hover:bg-foreground/10">
                      Bitácora
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/about" className="px-4 py-2 text-sm font-medium transition-colors rounded-md hover:bg-foreground/10">
                      Sobre mí
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* =========================================
            BLOQUE DERECHO: Comandos + Menú Móvil
        ========================================= */}
        {/* 
          1. flex-1: Toma el espacio central sobrante.
          2. justify-end: Empuja el contenido hacia el borde derecho.
        */}
        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-4">

          {/* 
            Contenedor del CommandMenu. 
            Limitamos su ancho máximo en móviles (max-w-[200px] o w-full) para 
            que no desborde, pero permitimos que crezca en desktop.
          */}
          <div className="w-full max-w-[220px] md:max-w-none md:w-auto">
            <CommandMenu />
          </div>

          {/* NAVEGACIÓN MÓVIL */}
          {/* 
            shrink-0: La regla de oro aquí. Evita que el CommandMenu aplaste este div.
          */}
          <div className="md:hidden flex items-center shrink-0">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button className="p-2 -mr-2 text-muted-foreground hover:text-foreground transition-colors" aria-label="Abrir menú">
                  <Menu className="size-6" />
                </button>
              </SheetTrigger>

              <SheetContent side="left" className="w-[300px] sm:w-[400px] border-r border-border bg-background/95 backdrop-blur-md px-6">
                <SheetHeader className="pb-6 border-b border-border pt-4">
                  <SheetTitle className="font-mono tracking-tighter text-left flex items-center gap-2">
                    ~/ciervo
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-2 mt-8">
                  <Link href="/projects" className="flex items-center px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-all" onClick={() => setIsOpen(false)}>
                    Proyectos
                  </Link>
                  <Link href="/blog" className="flex items-center px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-all" onClick={() => setIsOpen(false)}>
                    Bitácora
                  </Link>
                  <Link href="/about" className="flex items-center px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-all" onClick={() => setIsOpen(false)}>
                    Sobre mí
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

      </div>
    </header>
  );
}