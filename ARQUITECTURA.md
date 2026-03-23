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
*   [x] **Componente finalizado:** `Navbar` global (Client Component). Implementa interactividad de scroll (`useEffect`, `useState`) para revelar un borde inferior sutil con efecto de cristal esmerilado al navegar. Además, cuenta con un diseño bimodal, implementando un menú lateral (`Sheet` de shadcn/ui) fluido y accesible para dispositivos móviles, utilizando *React Portals*.
*   [x] **Componente finalizado:** `Hero Section` en la ruta principal (`/`). Diseño minimalista con tipografía de gran peso, centrado en el texto y utilizando posicionamiento absoluto y filtros de desenfoque (`blur`) de Tailwind para crear el efecto "Glow" ambiental (azul y naranja) sin interrumpir el flujo del documento.
*   [x] **Componente finalizado:** `TechStack` (Marquesina Infinita). Implementado mediante animaciones puras de CSS (`@keyframes` en `globals.css`) para evitar carga innecesaria de JavaScript, logrando un desplazamiento infinito, suave y con un efecto de fundido en los bordes.
*   [x] **Componente finalizado:** `FeaturedProjects` (Bento Grid). Layout de dos columnas equilibrado (`max-w-7xl`). Utiliza renderizado dinámico (`.map()`) sobre un arreglo de datos que incluye configuración semántica de estado (Producción, Mantenimiento, etc.). Las tarjetas combinan imágenes con filtros bimodal (`brightness`), un hover con efecto *Glow* intensificado, y badges reubicados semánticamente en el Header.
*   [x] **Layout Ajustado:** Implementación de Flexbox elástico (`min-h-svh` y `flex-1`) en la estructura del `page.tsx` y el Hero para asegurar que el primer viewport termine exactamente en la línea del `TechStack` (Pixel-perfect design).
*   [x] **Componente finalizado:** `Footer` global. Diseño limpio, incluyendo branding e iconos de contacto (`lucide-react`), anclado al fondo del `layout.tsx` principal.
*   [ ] **En progreso:** Diseño de la sección `Bitácora Reciente` en la Landing Page o creación de las rutas dinámicas individuales para los proyectos (ej. `/projects/[slug]`).