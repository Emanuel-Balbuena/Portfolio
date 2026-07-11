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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Menu, Sun, Moon, Monitor } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import * as React from "react";

import { CommandMenu } from "@/components/command-menu";

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  const t = useTranslations("Navigation");
  const tNav = useTranslations("Navbar");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const changeTheme = (newTheme: string) => {
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      const doc = document as unknown as { startViewTransition?: (callback: () => void) => void };
      if (doc.startViewTransition) {
        doc.startViewTransition(() => {
          setTheme(newTheme);
        });
      } else {
        setTheme(newTheme);
      }
    } else {
      setTheme(newTheme);
    }
  };

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const changeLanguage = (newLocale: string) => {
    if (locale !== newLocale) {
      const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
      router.push(newPathname);
    }
  };

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
        <div className="flex items-center gap-6 md:gap-8">
          <Link href="/" className="font-mono font-bold tracking-tighter flex items-center gap-2">
            ~/ciervo
          </Link>

          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList className="gap-2">
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/projects" className="px-4 py-2 text-sm font-medium transition-colors rounded-md hover:bg-foreground/10">
                      {t("projects")}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/blog" className="px-4 py-2 text-sm font-medium transition-colors rounded-md hover:bg-foreground/10">
                      {t("blog")}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/about" className="px-4 py-2 text-sm font-medium transition-colors rounded-md hover:bg-foreground/10">
                      {t("about")}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-4">

          {/* Contenedor de botones oculto en móvil (hidden md:flex) */}
          <div className="hidden md:flex items-center gap-2">
            {/* Dropdown Menu de Idioma (Escritorio) */}
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <button
                  className="h-9 px-3 flex items-center text-xs font-mono font-bold tracking-wider text-muted-foreground hover:text-foreground transition-colors hover:bg-muted rounded-md cursor-pointer border-none bg-transparent focus:outline-none"
                  aria-label="Seleccionar idioma"
                >
                  {locale.toUpperCase()}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-32">
                <DropdownMenuItem
                  onClick={() => changeLanguage("es")}
                  className={cn("cursor-pointer", locale === "es" && "bg-muted/40 font-semibold text-foreground")}
                >
                  {tNav("langEs")}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => changeLanguage("en")}
                  className={cn("cursor-pointer", locale === "en" && "bg-muted/40 font-semibold text-foreground")}
                >
                  {tNav("langEn")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Dropdown Menu de Tema (Escritorio) */}
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <button
                  className="h-9 px-3 flex items-center text-muted-foreground hover:text-foreground transition-colors hover:bg-muted rounded-md cursor-pointer border-none bg-transparent focus:outline-none"
                  aria-label="Seleccionar tema"
                >
                  {!mounted ? (
                    <span className="w-4 h-4 block" />
                  ) : theme === "dark" ? (
                    <Moon className="size-4" />
                  ) : theme === "light" ? (
                    <Sun className="size-4" />
                  ) : (
                    <Monitor className="size-4" />
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-36">
                <DropdownMenuItem
                  onClick={() => changeTheme("light")}
                  className={cn("cursor-pointer gap-2", mounted && theme === "light" && "bg-muted/40 font-semibold text-foreground")}
                >
                  <Sun className="size-4" />
                  <span>{tNav("themeLight")}</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => changeTheme("dark")}
                  className={cn("cursor-pointer gap-2", mounted && theme === "dark" && "bg-muted/40 font-semibold text-foreground")}
                >
                  <Moon className="size-4" />
                  <span>{tNav("themeDark")}</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => changeTheme("system")}
                  className={cn("cursor-pointer gap-2", mounted && theme === "system" && "bg-muted/40 font-semibold text-foreground")}
                >
                  <Monitor className="size-4" />
                  <span>{tNav("themeSystem")}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="w-full max-w-[220px] md:max-w-none md:w-auto">
            <CommandMenu />
          </div>

          <div className="md:hidden flex items-center shrink-0">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button className="p-2 -mr-2 text-muted-foreground hover:text-foreground transition-colors" aria-label="Abrir menú">
                  <Menu className="size-6" />
                </button>
              </SheetTrigger>

              {/* Se agregó flex y flex-col al SheetContent para poder usar mt-auto y anclar elementos abajo */}
              <SheetContent side="left" className="flex flex-col w-[300px] sm:w-[400px] border-r border-border bg-background/95 backdrop-blur-md px-6">
                <SheetHeader className="pb-6 border-b border-border pt-4">
                  <SheetTitle className="font-mono tracking-tighter text-left flex items-center gap-2">
                    ~/ciervo
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-2 mt-8">
                  <Link href="/projects" className="flex items-center px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-all" onClick={() => setIsOpen(false)}>
                    {t("projects")}
                  </Link>
                  <Link href="/blog" className="flex items-center px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-all" onClick={() => setIsOpen(false)}>
                    {t("blog")}
                  </Link>
                  <Link href="/about" className="flex items-center px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-all" onClick={() => setIsOpen(false)}>
                    {t("about")}
                  </Link>
                </div>

                {/* Controles móviles anclados al fondo */}
                <div className="mt-auto border-t border-border pt-6 pb-4 flex items-center gap-4">

                  {/* Dropdown Menu de Idioma (Móvil) */}
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                      <button
                        className="h-10 px-4 flex items-center justify-center bg-muted/50 text-xs font-mono font-bold tracking-wider text-muted-foreground hover:text-foreground transition-colors hover:bg-muted rounded-md border-none focus:outline-none"
                        aria-label="Seleccionar idioma"
                      >
                        {locale.toUpperCase()}
                      </button>
                    </DropdownMenuTrigger>
                    {/* align="start" para que abra hacia la derecha dentro del menú lateral */}
                    <DropdownMenuContent align="start" className="w-32">
                      <DropdownMenuItem
                        onClick={() => changeLanguage("es")}
                        className={cn("cursor-pointer", locale === "es" && "bg-muted/40 font-semibold text-foreground")}
                      >
                        {tNav("langEs")}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => changeLanguage("en")}
                        className={cn("cursor-pointer", locale === "en" && "bg-muted/40 font-semibold text-foreground")}
                      >
                        {tNav("langEn")}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Dropdown Menu de Tema (Móvil) */}
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                      <button
                        className="h-10 px-4 flex items-center justify-center bg-muted/50 text-muted-foreground hover:text-foreground transition-colors hover:bg-muted rounded-md border-none focus:outline-none"
                        aria-label="Seleccionar tema"
                      >
                        {!mounted ? (
                          <span className="w-5 h-5 block" />
                        ) : theme === "dark" ? (
                          <Moon className="size-5" />
                        ) : theme === "light" ? (
                          <Sun className="size-5" />
                        ) : (
                          <Monitor className="size-5" />
                        )}
                      </button>
                    </DropdownMenuTrigger>
                    {/* align="start" para que no se salga de la pantalla por la izquierda */}
                    <DropdownMenuContent align="start" className="w-36">
                      <DropdownMenuItem
                        onClick={() => changeTheme("light")}
                        className={cn("cursor-pointer gap-2", mounted && theme === "light" && "bg-muted/40 font-semibold text-foreground")}
                      >
                        <Sun className="size-4" />
                        <span>{tNav("themeLight")}</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => changeTheme("dark")}
                        className={cn("cursor-pointer gap-2", mounted && theme === "dark" && "bg-muted/40 font-semibold text-foreground")}
                      >
                        <Moon className="size-4" />
                        <span>{tNav("themeDark")}</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => changeTheme("system")}
                        className={cn("cursor-pointer gap-2", mounted && theme === "system" && "bg-muted/40 font-semibold text-foreground")}
                      >
                        <Monitor className="size-4" />
                        <span>{tNav("themeSystem")}</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}