# Arquitectura y Sistema de Diseño: Portafolio Personal

## 1. Visión General y Filosofía
Este proyecto es un portafolio personal y bitácora técnica. La estética general persigue una filosofía de "Alta Ingeniería", fuertemente inspirada en interfaces como Vercel, Stripe y Once UI. Se prioriza el rendimiento, la accesibilidad y un diseño bimodal impecable (Dark/Light mode). 

La identidad visual integra el concepto de un "Ciervo/Venado" de forma estrictamente abstracta y técnica (geometría low-poly, wireframes, esquinas precisas), evitando representaciones literales o caricaturescas.

## 2. Stack Tecnológico
* **Framework Core:** Next.js (App Router).
* **Librería UI:** React.
* **Estilos:** Tailwind CSS v4 (Enfoque CSS-First sin archivo `tailwind.config.ts`).
* **Componentes y Accesibilidad:** `shadcn/ui` motorizado por Radix UI (Headless primitives).
* **Gestor de Paquetes:** `pnpm`.

## 3. Sistema de Diseño (Design System)

### 3.1. Tipografía
Implementada vía `next/font/google` para carga en tiempo de servidor (cero CLS):
* **Primaria (Sans-serif):** `Plus Jakarta Sans` (Variable `--font-sans`). Usada para la interfaz general, títulos y lectura. Aporta un tono limpio, moderno y premium.
* **Secundaria/Técnica (Monospace):** `JetBrains Mono` (Variable `--font-mono`). Usada para bloques de código, etiquetas técnicas y acentos de terminal.

### 3.2. Paleta de Colores
Controlada por variables CSS en `app/globals.css` (Preset: New York, Base: Zinc).
* **Modo Oscuro (Principal):** Fondos profundos (casi negros) y texto de alto contraste.
* **Modo Claro:** Fondos limpios y ultra blancos.
* **Acentos (Identidad):** Azul Eléctrico y Naranja Vibrante. 
    * *Regla de uso:* NUNCA se usan como colores de fondo principales. Se aplican exclusivamente en estados interactivos (hover), bordes con gradientes sutiles (1px), o resplandores de fondo desenfocados (*glow effects* tipo Stripe) detrás de componentes clave.

### 3.3. Interfaz y Componentes (UI/UX)
* **Bordes y Sombras:** Uso extensivo de bordes de 1px (`border-border`), evitando sombras pesadas. Todo debe sentirse ligero y afilado.
* **Efectos de Cristal (Glassmorphism):** Menús y capas superpuestas utilizan desenfoque de fondo (`bg-background/80 backdrop-blur-md`).
* **Modificaciones de shadcn/ui:** Los componentes descargados en `components/ui/` pueden y deben ser modificados a nivel de clases de Tailwind para ajustarse a las reglas de bordes y acentos mencionados.

### 3.4. Arquitectura de Layouts y Estandarización Visual (Pixel-Perfect)
Para mantener la ilusión de una navegación fluida sin "Layout Shifts" (saltos visuales), todas las rutas internas de lectura e información (Proyectos, Bitácora, Sobre Mí) deben adherirse a un estándar de contenedor de dos capas. Esto soluciona los conflictos de cálculo del *Box Model* al combinar `max-width` con `padding`.

* **Outer Wrapper (El Padre - Contención y Espaciado):** Debe ocupar el 100% de la pantalla, centrar su contenido y aplicar los márgenes internos responsivos.
    *Clases estándar:* `w-full flex flex-col items-center px-4 sm:px-8` (Nota: El `min-h-screen` y el padding vertical `pt-24 pb-12` se aplican aquí).
* **Inner Wrapper (El Hijo - Límite de Lectura):** Contenedor estricto que no debe llevar paddings horizontales para garantizar que la medida sea exacta en todos los dispositivos. 
    *Clases estándar:* `w-full max-w-5xl`. Limita el ancho a exactamente 1024px, la medida estándar de "Alta Ingeniería" para evitar fatiga visual en la lectura de documentación.

## 4. Arquitectura de Next.js (App Router)

### 4.1. Server Components vs. Client Components
* **Server Components (Por defecto):** Se utilizan para todo el layout estático, renderizado del blog y secciones que no requieren interactividad directa.
* **Client Components (`"use client"`):** Reservados estrictamente para componentes de UI que requieren acceso a la API del navegador (`window`, `document`) o a Hooks de estado de React (`useState`, `useEffect`).

### 4.2. Estructura de Rutas
El enrutamiento está basado en el sistema de archivos dentro del directorio `app/`:
* `/` (Home): Hero section técnico, presentación e introducción.
* `/projects`: Grid de tarjetas técnicas destacando desarrollo web, arquitecturas e integraciones IoT/Hardware.
* `/blog`: Bitácora técnica (Markdown/MDX) para documentar estándares, frameworks y resoluciones de problemas en sistemas.

## 5. Progreso Actual del Desarrollo
* [x] Inicialización del proyecto con plantilla base de Vercel.
* [x] Transición y configuración exitosa a **Tailwind v4** (variables en `globals.css`).
* [x] Integración de fuentes optimizadas (`Plus Jakarta Sans`, `JetBrains Mono`) en `layout.tsx`.
* [x] Inicialización de `shadcn/ui` (Radix UI) con soporte completo para Dark/Light mode (`ThemeProvider`).
* [x] **Componente finalizado:** `Navbar` global (Client Component). 
    * Implementa interactividad de scroll para efectos *glassmorphism* y menú bimodal responsivo. 
    * **Engaño UX (Fake Input):** Se integró un botón con apariencia exacta a un `InputGroup` que actúa como disparador de la paleta de comandos, previniendo el secuestro de foco y desbordamiento en móviles.
* [x] **Componente finalizado:** `Hero Section` en la ruta principal (`/`). Diseño minimalista y bimodal con efectos "Glow" mediante posicionamiento absoluto y filtros de desenfoque.
* [x] **Componente finalizado:** `TechStack` (Marquesina Infinita). Animaciones CSS puras con política estricta de `overflow-hidden`.
* [x] **Componente finalizado:** `FeaturedProjects` (Bento Grid). Layout elástico con renderizado dinámico de tarjetas técnicas.
* [x] **Componente finalizado:** `Footer` global. Diseño limpio anclado al fondo del layout.
* [x] **Componente finalizado:** `CommandMenu` (Paleta de comandos ⌘K). Implementado como un *Client Component* con un *Event Listener* global. Integra primitivas de `Dialog` y `Command` de shadcn/ui.
* [x] **Arquitectura de Datos (SSOT):** Implementación de una "Fuente de Verdad Única" en `lib/projects.ts` aplicando principios DRY.
* [x] **Ruta finalizada:** `ProjectsPage` (`/projects`). Interfaz con control de estado (Grid vs Terminal) y desmontaje diferido.
* [x] **Componente finalizado:** `TerminalWindow` (Easter Egg de Alta Ingeniería). Componente interactivo que simula una consola TTY con VFS, historial, predictivo tipo Fish Shell y teatro visual CRT.
* [x] **Enrutamiento Dinámico y Arquitectura Híbrida:** Implementación del motor de rutas dinámicas (`app/projects/[slug]/page.tsx`) con un patrón de "Diccionario de Componentes" (SSG vía `generateStaticParams`).
* [x] **Estandarización UI finalizada:** Normalización del layout mediante la arquitectura de doble contenedor (`max-w-5xl`) e implementación nativa del patrón `Breadcrumb` de shadcn/ui para jerarquías claras y consistentes entre el índice y la vista de detalle de proyectos.
* [x] **Vista finalizada:** `PowerLinkDetail` (`/projects/powerlink`). Interfaz narrativa dividida en 4 actos de Alta Ingeniería (End-to-End):
    * **Acto 0 (Resumen Ejecutivo):** Grid Bento enfocado en el valor de negocio (ROI) y métricas de impacto con micro-interacciones responsivas (Glassmorphism y Glow corporativo).
    * **Acto I (Hardware 3D):** Modelo ESP32 interactivo renderizado con `@react-three/fiber`, optimizado mediante *Shadow Baking* (GPU) y Parallax matemático inyectado directo al `useFrame` de WebGL.
    * **Acto II (Scrollytelling):** Flujo de ingesta narrativo. Utiliza un Custom Hook nativo (Intersection Observer, 0kb de peso) para sincronizar el scroll del texto con una terminal simulada pegajosa (`sticky` nativo con `overflow-x-clip`).
    * **Acto III (Blueprint Interactivo):** Diagrama de topología de red (Edge a Cloud). Se descartaron los HoverCards por un patrón "Interactive Inspector" con un carrusel de scroll horizontal táctil (CSS snap) garantizando accesibilidad total en móviles.
* [ ] **En progreso:** Desarrollo de la ruta `AboutMe` (`/about`). Perfil profesional y línea de tiempo estructurada bajo la estética del sistema de diseño bimodal.
* [ ] **En progreso:** Internacionalización (i18n) para tener idiomas multiples (español e ingles) de forma automatica a traves de navegador, y de forma manual (con un boton) para cambiar el idioma de la web.