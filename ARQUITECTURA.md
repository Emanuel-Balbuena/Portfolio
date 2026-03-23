# Arquitectura y Sistema de Diseño: Portafolio Personal

## 1. Visión General y Filosofía
Este proyecto es un portafolio personal y bitácora técnica. La estética general persigue una filosofía de "Alta Ingeniería", fuertemente inspirada en interfaces como Vercel, Stripe y Once UI. Se prioriza el rendimiento, la accesibilidad y un diseño bimodal impecable (Dark/Light mode). 

La identidad visual integra el concepto de un "Ciervo/Venado" de forma estrictamente abstracta y técnica (geometría low-poly, wireframes, esquinas precisas), evitando representaciones literales o caricaturescas.

## 2. Stack Tecnológico
*   **Framework Core:** Next.js (App Router).
*   **Librería UI:** React.
*   **Estilos:** Tailwind CSS v4 (Enfoque CSS-First sin archivo `tailwind.config.ts`).
*   **Componentes y Accesibilidad:** `shadcn/ui` motorizado por Radix UI (Headless primitives).
*   **Gestor de Paquetes:** `pnpm`.

## 3. Sistema de Diseño (Design System)

### 3.1. Tipografía
Implementada vía `next/font/google` para carga en tiempo de servidor (cero CLS):
*   **Primaria (Sans-serif):** `Plus Jakarta Sans` (Variable `--font-sans`). Usada para la interfaz general, títulos y lectura. Aporta un tono limpio, moderno y premium.
*   **Secundaria/Técnica (Monospace):** `JetBrains Mono` (Variable `--font-mono`). Usada para bloques de código, etiquetas técnicas y acentos de terminal.

### 3.2. Paleta de Colores
Controlada por variables CSS en `app/globals.css` (Preset: New York, Base: Zinc).
*   **Modo Oscuro (Principal):** Fondos profundos (casi negros) y texto de alto contraste.
*   **Modo Claro:** Fondos limpios y ultra blancos.
*   **Acentos (Identidad):** Azul Eléctrico y Naranja Vibrante. 
    *   *Regla de uso:* NUNCA se usan como colores de fondo principales. Se aplican exclusivamente en estados interactivos (hover), bordes con gradientes sutiles (1px), o resplandores de fondo desenfocados (*glow effects* tipo Stripe) detrás de componentes clave.

### 3.3. Interfaz y Componentes (UI/UX)
*   **Bordes y Sombras:** Uso extensivo de bordes de 1px (`border-border`), evitando sombras pesadas. Todo debe sentirse ligero y afilado.
*   **Efectos de Cristal (Glassmorphism):** Menús y capas superpuestas utilizan desenfoque de fondo (`bg-background/80 backdrop-blur-md`).
*   **Modificaciones de shadcn/ui:** Los componentes descargados en `components/ui/` pueden y deben ser modificados a nivel de clases de Tailwind para ajustarse a las reglas de bordes y acentos mencionados.

## 4. Arquitectura de Next.js (App Router)

### 4.1. Server Components vs. Client Components
*   **Server Components (Por defecto):** Se utilizan para todo el layout estático, renderizado del blog y secciones que no requieren interactividad directa.
*   **Client Components (`"use client"`):** Reservados estrictamente para componentes de UI que requieren acceso a la API del navegador (`window`, `document`) o a Hooks de estado de React (`useState`, `useEffect`).

### 4.2. Estructura de Rutas
El enrutamiento está basado en el sistema de archivos dentro del directorio `app/`:
*   `/` (Home): Hero section técnico, presentación e introducción.
*   `/projects`: Grid de tarjetas técnicas destacando desarrollo web, arquitecturas e integraciones IoT/Hardware.
*   `/blog`: Bitácora técnica (Markdown/MDX) para documentar estándares, frameworks y resoluciones de problemas en sistemas.

## 5. Progreso Actual del Desarrollo
*   [x] Inicialización del proyecto con plantilla base de Vercel.
*   [x] Transición y configuración exitosa a **Tailwind v4** (variables en `globals.css`).
*   [x] Integración de fuentes optimizadas (`Plus Jakarta Sans`, `JetBrains Mono`) en `layout.tsx`.
*   [x] Inicialización de `shadcn/ui` (Radix UI) con soporte completo para Dark/Light mode (`ThemeProvider`).
*   [x] **Componente finalizado:** `Navbar` global (Client Component). Implementa interactividad de scroll para efectos *glassmorphism* y menú bimodal responsivo. **(Actualizado)** Se integró la paleta de comandos global resolviendo colapsos de Flexbox en móviles mediante la regla `shrink-0`.
*   [x] **Componente finalizado:** `Hero Section` en la ruta principal (`/`). Diseño minimalista y bimodal con efectos "Glow" mediante posicionamiento absoluto y filtros de desenfoque.
*   [x] **Componente finalizado:** `TechStack` (Marquesina Infinita). Animaciones CSS puras. **(Actualizado)** Se implementó una política de `overflow-hidden` estricta para evitar desbordamientos horizontales en el viewport.
*   [x] **Componente finalizado:** `FeaturedProjects` (Bento Grid). Layout elástico con renderizado dinámico de tarjetas técnicas.
*   [x] **Layout Ajustado:** Arquitectura *Pixel-perfect* y muro de contención global. Se aplicó `overflow-x-hidden` y `w-full` en el `<body>` del `layout.tsx` para erradicar el scroll horizontal no deseado en dispositivos móviles.
*   [x] **Componente finalizado:** `Footer` global. Diseño limpio anclado al fondo del layout.
*   [x] **Componente finalizado:** `CommandMenu` (Paleta de comandos ⌘K). Implementado como un *Client Component* con un *Event Listener* global. Integra primitivas de `Dialog` y `Command` de shadcn/ui con cumplimiento estricto de accesibilidad (`DialogTitle` con clase `sr-only`).
*   [x] **Prueba de Concepto (PoC):** Rutas dinámicas (`/projects/powerlink`). Diseño de un diagrama de arquitectura interactivo utilizando `HoverCard` y `Tabs`. Se validó la viabilidad de usar componentes reutilizables (`SystemNode`) y *Props* para inyectar datos técnicos de hardware y código en tiempo real, demostrando un enfoque de interfaz estilo "Dashboard".
*   [x] **Configuración finalizada:** Implementación exitosa de `next-themes` para un cambio bimodal real (Dark/Light). Se eliminaron atajos conflictivos del navegador y se estableció `Alt+T` como estándar seguro en el `CommandMenu`, garantizando compatibilidad en todos los componentes.
*   [x] **Arquitectura de Datos (SSOT):** Implementación de una "Fuente de Verdad Única" en `lib/projects.ts` aplicando principios DRY. Este archivo ahora alimenta dinámicamente la grid de inicio, la vista completa de proyectos y funciona como ejecutable dentro del entorno CLI.
*   [x] **Ruta finalizada:** `ProjectsPage` (`/projects`). Interfaz con control de estado que permite alternar fluidamente entre un listado de documentación técnica sobria (GUI) y la consola interactiva. Incorpora desmontaje diferido de componentes de React para permitir animaciones de salida.
*   [x] **Componente finalizado:** `TerminalWindow` (Easter Egg de Alta Ingeniería). Componente interactivo que simula una consola TTY.
    *   Sub-sistemas integrados: Motor de evaluación de comandos, Sistema de Archivos Virtual en Memoria (VFS) para navegación de directorios, historial de flechas (`ArrowUp`/`ArrowDown`), autocompletado predictivo *Ghost Text* estilo Fish Shell (`Tab` / `ArrowRight`), y enrutamiento imperativo hacia los detalles de cada proyecto.
    *   Teatro Visual: Secuencia de *Boot* asíncrona simulada y animaciones de encendido/apagado CRT (Tubo de Rayos Catódicos) inyectadas mediante `@keyframes` de CSS puro para máximo rendimiento.
*   [ ] **En progreso:** Prueba de Concepto (PoC) para rutas dinámicas (`/projects/[slug]`). Diseño de un diagrama de arquitectura interactivo utilizando `HoverCard` y `Tabs`. Integración de un resaltador de sintaxis para los bloques de código técnico.