// Añadimos el tipo SystemStatus aquí para que sea global
export type SystemStatus = "production" | "maintenance" | "paused" | "closed";

export type Project = {
    id: string;
    name: string;       // El "slug" para la URL y el comando de la terminal (ej: "powerlink")
    title: string;      // Título formal para las tarjetas (ej: "Powerlink IoT Architecture")
    desc: string;       // Descripción corta
    longDesc: string;   // Descripción detallada
    techStack: string[];
    link?: string;

    // Nuevos campos opcionales para la UI gráfica
    imageUrl?: string;
    status?: SystemStatus;
    featured?: boolean; // Flag para mostrarlo en la página principal
};

export const PROJECTS: Project[] = [
    {
        id: "prj-1",
        name: "powerlink",
        title: "Powerlink IoT Architecture",
        desc: "Sistema de monitoreo eléctrico con ESP32 y sensores PZEM-004t.",
        longDesc: "Un gateway de alto rendimiento que enruta tráfico de microservicios con autenticación JWT nativa y rate-limiting basado en Redis. Implementación de medidas de ciberseguridad.",
        techStack: ["IoT", "Hardware", "Security", "Go"],
        link: "https://github.com/tu-usuario/powerlink",
        imageUrl: "/images/ft-powerlink.png",
        status: "production",
        featured: true, // <--- Este aparecerá en el inicio
    },
    {
        id: "prj-2",
        name: "arch-env",
        title: "Arch Linux Setup",
        desc: "Entorno de desarrollo de ultra bajo consumo y alta eficiencia.",
        longDesc: "Configuración completa del sistema operativo utilizando Hyprland, Wayland, y scripts en Bash/Python para automatización del workflow. Integración de dotfiles personalizados.",
        techStack: ["Linux", "SysAdmin", "Scripting"],
        imageUrl: "/images/ft-hyprland.png",
        status: "maintenance",
        featured: true, // <--- Este también aparecerá en el inicio
    },
    {
        id: "prj-3",
        name: "ui-system",
        title: "Librería de Componentes",
        desc: "Librería de componentes React",
        longDesc: "Sistema de diseño accesible y headless construido sobre Radix Primitives y Tailwind CSS.",
        techStack: ["React", "TypeScript", "Tailwind", "Radix UI"],
        status: "production",
        // No tiene "featured: true", así que solo se verá en la página de proyectos / terminal
    },
    {
        id: "prj-4",
        name: "terminal-portfolio",
        title: "Terminal CLI",
        desc: "Interfaz basada en CLI",
        longDesc: "Un portafolio interactivo que simula una terminal TTY completa con comandos, historial y autocompletado nativo.",
        techStack: ["Next.js", "React", "Tailwind CSS"],
        status: "production",
    }
];