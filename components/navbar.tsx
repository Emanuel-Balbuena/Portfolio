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
import { Menu, Terminal } from "lucide-react"; // Importamos el icono de menú
import Link from "next/link";
import * as React from "react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  // Estado para controlar si el menú móvil está abierto o cerrado
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
        
        {/* LOGO */}
        <div className="flex gap-2 items-center">
          <Link href="/" className="font-mono font-bold tracking-tighter flex items-center gap-2">
            ~/ciervo
          </Link>
        </div>

        {/* NAVEGACIÓN DESKTOP (Oculta en móviles, visible desde 'md') */}
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList className="gap-2">
              <NavigationMenuItem>
                <Link href="/projects" legacyBehavior passHref>
                  <NavigationMenuLink className="px-4 py-2 text-sm font-medium transition-colors rounded-md hover:bg-foreground/10">
                    Proyectos
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/blog" legacyBehavior passHref>
                  <NavigationMenuLink className="px-4 py-2 text-sm font-medium transition-colors rounded-md hover:bg-foreground/10">
                    Bitácora
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/contact" legacyBehavior passHref>
                  <NavigationMenuLink className="px-4 py-2 text-sm font-medium transition-colors rounded-md hover:bg-foreground/10">
                    Contacto
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* NAVEGACIÓN MÓVIL (Visible en móviles, oculta desde 'md') */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="p-2 -mr-2 text-muted-foreground hover:text-foreground transition-colors" aria-label="Abrir menú">
                <Menu className="size-6" />
              </button>
            </SheetTrigger>
            
            {/* 
              Cambiamos side="left" como solicitaste. 
              Cambiamos border-l por border-r porque ahora el borde limitante está a la derecha del menú.
              Añadimos px-6 para dar un respiro general al contenedor.
            */}
            <SheetContent side="left" className="w-[300px] sm:w-[400px] border-r border-border bg-background/95 backdrop-blur-md px-6">
              <SheetHeader className="pb-6 border-b border-border pt-4">
                <SheetTitle className="font-mono tracking-tighter text-left flex items-center gap-2">
                  <Terminal className="size-4 text-blue-500" />
                  ~/ciervo
                </SheetTitle>
              </SheetHeader>
              
              {/* Contenedor de los enlaces con un poco de separación superior (mt-8) */}
              <div className="flex flex-col gap-2 mt-8">
                {/* 
                  Transformamos los enlaces en "Hitboxes" amplios.
                  - px-4 py-3: Espaciado interno generoso para el dedo.
                  - rounded-md: Bordes suaves consistentes con el resto de botones.
                  - hover:bg-muted/50: Feedback visual al tocar/pasar el mouse.
                */}
                <Link 
                  href="/projects" 
                  className="flex items-center px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  Proyectos
                </Link>
                <Link 
                  href="/blog" 
                  className="flex items-center px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  Bitácora
                </Link>
                <Link 
                  href="/contact" 
                  className="flex items-center px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  Contacto
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  );
}