"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";

class Ember {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  maxLife: number;
  life: number;
  color: string;

  constructor(x: number, y: number, isDark = true, isBurst = false) {
    this.x = x;
    this.y = y;
    if (isBurst) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6 + 3;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.size = Math.random() * 2.5 + 1.2;
      this.maxLife = Math.random() * 60 + 40;
    } else {
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = -(Math.random() * 2.2 + 0.8);
      this.size = Math.random() * 1.8 + 0.8;
      this.maxLife = Math.random() * 180 + 120;
    }
    this.life = this.maxLife;
    this.alpha = 1;

    // Colores condicionales según el tema
    if (isDark) {
      // Colores de fuego naranja/cobre
      const colors = ["#ff5722", "#f4511e", "#ffb300", "#ff9100", "#e65100"];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    } else {
      // Colores de fuego azul/celeste/índigo
      const colors = ["#00b0ff", "#00e5ff", "#2979ff", "#1a237e", "#0288d1"];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }
  }

  update(mX: number, mY: number, proximity: number) {
    this.life--;
    
    // Opacidad lineal suave y segura
    this.alpha = this.life / this.maxLife;
    this.alpha = Math.max(0, Math.min(1, this.alpha));

    // Mayor velocidad de ascenso cuando el cursor está cerca del target
    const speedMultiplier = 1 + proximity * 1.8;
    this.x += this.vx;
    this.y += this.vy * speedMultiplier;

    // Movimiento caótico y turbulento (sinusoidal + ruido aleatorio leve para simular corriente de aire)
    this.vx += Math.sin(this.life * 0.035) * 0.025 + (Math.random() - 0.5) * 0.09;

    // Repulsión física interactiva con el cursor
    const dx = this.x - mX;
    const dy = this.y - mY;
    const dist = Math.hypot(dx, dy);
    if (dist < 110) {
      const force = (110 - dist) / 110;
      const angle = Math.atan2(dy, dx);
      // Inercia que aparta las chispas con el movimiento del ratón o dedo
      this.x += Math.cos(angle) * force * 2.5;
      this.y += Math.sin(angle) * force * 1.5;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    // PREVENCIÓN DE BUG: No dibujar si la opacidad es casi nula.
    // Esto evita que el motor GPU del navegador (ej. Chrome) genere 
    // destellos blancos/brillos anómalos al renderizar sombras muy tenues.
    if (this.alpha <= 0.02) return;

    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    
    // Trazamos una línea hacia atrás según su velocidad para simular estela de calor (motion blur)
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - this.vx * 2, this.y - this.vy * 2);
    
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.size;
    ctx.lineCap = "round";
    
    // Multiplicar el shadowBlur por el alpha elimina los brillos fantasma al desaparecer
    ctx.shadowBlur = (this.size * 3.5) * this.alpha;
    ctx.shadowColor = this.color;
    ctx.stroke();
    ctx.restore();
  }
}

export function OrangeEffect() {
  const { resolvedTheme } = useTheme();
  const params = useParams();
  const locale = (params?.locale as string) || "es";
  const isDark = resolvedTheme === "dark";

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseX = useRef(-1000);
  const mouseY = useRef(-1000);
  const targetPos = useRef<{ x: number; y: number } | null>(null);
  const proximityRef = useRef(0);
  const progressRef = useRef(0);
  const [climax, setClimax] = useState(false);
  const climaxRef = useRef(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    climaxRef.current = climax;
    if (climax) {
      document.body.classList.add("climax-active");
    } else {
      document.body.classList.remove("climax-active");
    }
    return () => {
      document.body.classList.remove("climax-active");
    };
  }, [climax]);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let embers: Ember[] = [];

    // Ajustar tamaño del canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Track de coordenadas del mouse
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
    };
    
    // Track de coordenadas táctiles (Móvil)
    const handleTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseX.current = e.touches[0].clientX;
        mouseY.current = e.touches[0].clientY;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchstart", handleTouch, { passive: true });
    window.addEventListener("touchmove", handleTouch, { passive: true });

    // Loop principal de físicas y render
    const renderLoop = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Localizar la palabra código `Naranja` / `Orange` o `Azul` / `Blue`
      const codeElements = document.querySelectorAll(".prose code");
      let targetElement: HTMLElement | null = null;

      for (const el of Array.from(codeElements)) {
        const text = el.textContent?.trim().toLowerCase();
        if (
          text === "naranja" ||
          text === "orange" ||
          text === "azul" ||
          text === "blue"
        ) {
          targetElement = el as HTMLElement;
          // Reemplazo dinámico de texto basado en el tema
          if (isDark) {
            el.textContent = locale === "es" ? "Naranja" : "Orange";
          } else {
            el.textContent = locale === "es" ? "Azul" : "Blue";
          }
          break;
        }
      }

      let currentProximity = 0;

      if (targetElement) {
        // Asignación de clases condicionales según el tema
        const targetClass = isDark ? "orange-target" : "blue-target";
        const otherClass = isDark ? "blue-target" : "orange-target";

        if (!targetElement.classList.contains(targetClass)) {
          targetElement.classList.add(targetClass);
        }
        if (targetElement.classList.contains(otherClass)) {
          targetElement.classList.remove(otherClass);
        }

        const rect = targetElement.getBoundingClientRect();
        const tX = rect.left + rect.width / 2;
        const tY = rect.top + rect.height / 2;
        targetPos.current = { x: tX, y: tY };

        const dx = mouseX.current - tX;
        const dy = mouseY.current - tY;
        const distance = Math.hypot(dx, dy);

        // Influencia a 350px
        const maxInfluence = 350;
        currentProximity = Math.max(0, 1 - distance / maxInfluence);
        proximityRef.current = currentProximity;

        // Si está sobre la palabra, se calienta rápidamente (1 segundo = ~45 frames)
        if (distance < 35) {
          progressRef.current = Math.min(1, progressRef.current + 0.024);
          if (progressRef.current >= 1 && !climaxRef.current) {
            setClimax(true);
            climaxRef.current = true;
            // Explosión de chispas ardientes desde el centro
            for (let i = 0; i < 160; i++) {
              embers.push(new Ember(tX, tY, isDark, true));
            }
          }
        } else {
          // Si se retira, el calor disminuye lentamente
          progressRef.current = Math.max(0, progressRef.current - 0.015);
        }
      } else {
        targetPos.current = null;
        proximityRef.current = 0;
        progressRef.current = 0;
      }

      // Generar efecto de parpadeo realista en las luces (flickering de llama)
      const flicker = 0.94 + Math.sin(time * 0.012) * 0.04 + Math.random() * 0.02;

      // 2. Dibujar luz del cursor (Glow orgánico y grande)
      if (mouseX.current > -500) {
        // Brillo reducido aún más a petición del usuario
        const glowRadius = (90 + proximityRef.current * 120 + progressRef.current * 200) * flicker;
        const opacity = (0.08 + proximityRef.current * 0.25 + progressRef.current * 0.40) * flicker;

        ctx.save();
        if (isDark) {
          // Composición screen para mezcla aditiva real de luz física en fondo oscuro
          ctx.globalCompositeOperation = "screen";
          const gradient = ctx.createRadialGradient(
            mouseX.current,
            mouseY.current,
            0,
            mouseX.current,
            mouseY.current,
            glowRadius
          );
          gradient.addColorStop(0, `rgba(255, 235, 200, ${opacity})`); // Núcleo incandescente blanco/amarillo
          gradient.addColorStop(0.2, `rgba(255, 110, 15, ${opacity * 0.85})`);
          gradient.addColorStop(0.5, `rgba(220, 50, 0, ${opacity * 0.35})`);
          gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(mouseX.current, mouseY.current, glowRadius, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Mezcla estándar source-over con transparencia sutil para fondo claro
          ctx.globalCompositeOperation = "source-over";
          const gradient = ctx.createRadialGradient(
            mouseX.current,
            mouseY.current,
            0,
            mouseX.current,
            mouseY.current,
            glowRadius
          );
          gradient.addColorStop(0, `rgba(210, 245, 255, ${opacity * 0.7})`); // Núcleo azul/blanco brillante
          gradient.addColorStop(0.2, `rgba(0, 150, 255, ${opacity * 0.5})`);
          gradient.addColorStop(0.6, `rgba(26, 35, 126, ${opacity * 0.15})`);
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(mouseX.current, mouseY.current, glowRadius, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      // 3. Dibujar resplandor de ignición de la palabra (sin círculos artificiales)
      if (targetPos.current && (proximityRef.current > 0 || progressRef.current > 0)) {
        // Aura inicial más notable
        const auraRadius = (80 + proximityRef.current * 100 + progressRef.current * 220) * flicker;
        const opacity = (proximityRef.current * 0.45 + progressRef.current * 0.7) * flicker;

        ctx.save();
        if (isDark) {
          ctx.globalCompositeOperation = "screen";
          const gradient = ctx.createRadialGradient(
            targetPos.current.x,
            targetPos.current.y,
            0,
            targetPos.current.x,
            targetPos.current.y,
            auraRadius
          );
          gradient.addColorStop(0, `rgba(255, 220, 170, ${opacity})`);
          gradient.addColorStop(0.3, `rgba(255, 90, 5, ${opacity * 0.7})`);
          gradient.addColorStop(0.6, `rgba(230, 50, 0, ${opacity * 0.35})`);
          gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(targetPos.current.x, targetPos.current.y, auraRadius, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.globalCompositeOperation = "source-over";
          const gradient = ctx.createRadialGradient(
            targetPos.current.x,
            targetPos.current.y,
            0,
            targetPos.current.x,
            targetPos.current.y,
            auraRadius
          );
          gradient.addColorStop(0, `rgba(180, 235, 255, ${opacity * 0.6})`);
          gradient.addColorStop(0.3, `rgba(0, 130, 255, ${opacity * 0.4})`);
          gradient.addColorStop(0.7, `rgba(26, 35, 126, ${opacity * 0.1})`);
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(targetPos.current.x, targetPos.current.y, auraRadius, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      // 4. Spawning y físicas de partículas (chispas / brasas abundantes)
      const baseSpawnChance = 0.45; // Más brasas de fondo
      const proximitySpawnChance = proximityRef.current * 0.6; // Aumenta más rápido al acercarse
      const spawnChance = baseSpawnChance + proximitySpawnChance;

      if (Math.random() < spawnChance && embers.length < 500) { // Aumentado límite
        embers.push(new Ember(Math.random() * canvas.width, canvas.height + 15, isDark));
      }

      // 5. Actualizar y dibujar brasas
      embers = embers.filter((ember) => {
        ember.update(mouseX.current, mouseY.current, proximityRef.current);
        ember.draw(ctx);
        return ember.life > 0;
      });

      animationId = requestAnimationFrame(renderLoop);
    };

    animationId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchstart", handleTouch);
      window.removeEventListener("touchmove", handleTouch);
    };
  }, [isDark, locale, mounted]); // Se re-inicializa si cambia el tema, idioma, o cuando se monta

  if (!mounted) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        className={cn(
          "fixed inset-0 pointer-events-none z-10 w-full h-full",
          isDark && "mix-blend-screen"
        )}
      />
    </>
  );
}
