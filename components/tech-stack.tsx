"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
  SiNextdotjs,
  SiReact,
  SiArchlinux,
  SiTailwindcss,
  SiEspressif,
  SiSupabase,
  SiFlutter,
  SiPython,
  SiPhp,
  SiMariadb
} from "react-icons/si";

// Agregamos la propiedad 'color' con el código hexadecimal oficial de cada marca
const TECHNOLOGIES = [
  // Next.js se adapta al tema claro/oscuro usando foreground
  { name: "Next.js", icon: SiNextdotjs, color: "var(--foreground)" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Arch Linux", icon: SiArchlinux, color: "#1793D1" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "ESP32", icon: SiEspressif, color: "#E7352C" },
  { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
  { name: "Flutter", icon: SiFlutter, color: "#02569B" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "PHP", icon: SiPhp, color: "#777BB4" },
  { name: "MariaDB", icon: SiMariadb, color: "#003545" }, // O puedes usar un azul más claro si tu tema oscuro lo requiere
];

export function TechStack() {
  const t = useTranslations("TechStack");

  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const isHovered = useRef(false);
  const [dragging, setDragging] = useState(false);

  const dragStartX = useRef(0);
  const dragStartXExact = useRef(0);
  const exactX = useRef(0);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const autoScroll = () => {
      if (!isDragging.current) {
        // Velocidad: 0.5px si el ratón está encima, 1.5px si está fuera
        const speed = isHovered.current ? 0.5 : 1.5;
        exactX.current -= speed; // Movemos hacia la izquierda (negativo)

        // Cacheamos el ancho exacto del contenedor duplicado
        const halfWidth = track.scrollWidth / 2;

        // Bucle infinito perfecto basado en transform
        if (exactX.current <= -halfWidth) {
          exactX.current += halfWidth;
        }

        track.style.transform = `translate3d(${exactX.current}px, 0, 0)`;
      }
      animationRef.current = requestAnimationFrame(autoScroll);
    };

    animationRef.current = requestAnimationFrame(autoScroll);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = true;
    setDragging(true);
    dragStartX.current = e.pageX;
    dragStartXExact.current = exactX.current;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current || !trackRef.current) return;
    e.preventDefault();

    const x = e.pageX;
    const walk = (x - dragStartX.current) * 1.5; // Inercia
    let newX = dragStartXExact.current + walk;

    const halfWidth = trackRef.current.scrollWidth / 2;

    // Controles de bucle al arrastrar agresivamente en cualquier dirección
    while (newX <= -halfWidth) newX += halfWidth;
    while (newX > 0) newX -= halfWidth;

    exactX.current = newX;
    trackRef.current.style.transform = `translate3d(${newX}px, 0, 0)`;
  };

  const onPointerUpOrCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = false;
    setDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (error) {
      // Ignorar captura perdida
    }
  };

  return (
    <section className="w-full py-4 border-b border-border overflow-hidden bg-background">
      <div className="container px-4 md:px-6 mx-auto mb-4 text-center">
        <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest">
          {t("heading")}
        </p>
      </div>

      <div
        className="relative flex overflow-hidden w-full mask-edges"
        onMouseEnter={() => (isHovered.current = true)}
        onMouseLeave={() => (isHovered.current = false)}
      >
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div
          // Quitamos touch-pan-y y overflow-hidden, aplicamos touch-none para evitar que el navegador se robe el evento de deslizar
          className={`flex w-full py-5 touch-none ${dragging ? "cursor-grabbing" : "cursor-grab"
            } select-none`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUpOrCancel}
          onPointerCancel={onPointerUpOrCancel}
        >
          {/* El track que se moverá físicamente usando la GPU (translate3d) */}
          <div
            ref={trackRef}
            className="flex items-center w-max will-change-transform"
          >
            {/* Aumentamos el gap a 20 (80px) para más espacio entre logos */}
            <div className="flex items-center gap-20 px-10 w-max">
              {[...TECHNOLOGIES, ...TECHNOLOGIES].map((tech, index) => (
                <div
                  key={`tech-${index}`}
                  // Usamos la variable nativa de CSS --brand-color
                  style={{ "--brand-color": tech.color } as React.CSSProperties}
                  className="flex flex-col items-center justify-center gap-3 transition-transform duration-300 hover:scale-110 group/item"
                >
                  {/* Forzamos el color exacto de la marca al hacer hover y atenuamos si no hay interacción */}
                  <tech.icon className="size-10 text-muted-foreground/60 group-hover/item:text-[var(--brand-color)] transition-colors duration-300" />
                  <span className="font-mono text-xs font-medium text-muted-foreground/60 group-hover/item:text-[var(--brand-color)] transition-colors duration-300 whitespace-nowrap">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}