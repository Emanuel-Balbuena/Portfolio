// 1. Importamos el componente Hero que creamos en la carpeta components
import { FeaturedProjects } from "@/components/feature-projects";
import { Hero } from "@/components/hero";
import { TechStack } from "@/components/tech-stack";

export default function Page() {
  return (
    // Usamos la etiqueta <main> por semántica web (accesibilidad y SEO).
    // flex, min-h-screen y flex-col aseguran que el contenedor ocupe al menos 
    // toda la altura de la ventana y apile los elementos verticalmente.
    <main className="flex min-h-screen flex-col items-center w-full">
      
      {/* 2. Instanciamos el componente */}
      {/* Contenedor del Primer Viewport: Ocupa exactamente el 100% de la altura de la pantalla */}
      <div className="flex flex-col min-h-svh w-full">
        <Hero />
        <TechStack />
      </div>
      <FeaturedProjects />
      {/* Aquí abajo iremos agregando las siguientes secciones como <Projects />, <Stack />, etc. */}
    </main>
  );
}