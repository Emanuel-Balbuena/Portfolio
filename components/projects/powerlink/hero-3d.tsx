"use client";

import { Center, ContactShadows, Environment, Float, PresentationControls, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useTranslations } from "next-intl";

// 1. EL MODELO BASE (Ahora recibe isMobile para cambiar su tamaño)
function ESP32Model({ isMobile }: { isMobile: boolean }) {
    const { scene } = useGLTF("/models/esp32.glb");
    // Escala dinámica: 30 para celulares, 40 para computadoras
    const modelScale = isMobile ? 30 : 40;
    return <primitive object={scene} scale={modelScale} />;
}

// 2. ANIMACIÓN DE ENTRADA + PARALLAX GLOBAL (Ahora recibe isMobile para la altura)
function AnimatedModelGroup({ children, mouseRef, isMobile }: { children: React.ReactNode, mouseRef: React.MutableRefObject<{ x: number, y: number }>, isMobile: boolean }) {
    const groupRef = useRef<THREE.Group>(null);

    const BASE_ROT_X = 0.17;
    const BASE_ROT_Y = 1.60;
    const PARALLAX_INTENSITY = 0.15;

    // Altura dinámica: -1 en móviles para esquivar el texto largo, -0.60 en escritorio
    const TARGET_Y = isMobile ? -0.9 : -0.60;

    useFrame((state, delta) => {
        if (groupRef.current) {
            // Animación de altura hacia el nuevo TARGET_Y responsivo
            groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, TARGET_Y, delta * 2);

            const targetX = BASE_ROT_X + (mouseRef.current.y * PARALLAX_INTENSITY);
            const targetY = BASE_ROT_Y + (mouseRef.current.x * PARALLAX_INTENSITY);

            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, delta * 3);
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, delta * 3);
        }
    });

    return (
        <group ref={groupRef} position={[0, -6, 0]} rotation={[BASE_ROT_X, BASE_ROT_Y, 0.50]}>
            {children}
        </group>
    );
}

useGLTF.preload("/models/esp32.glb");

// 3. COMPONENTE PRINCIPAL
export function PowerLinkHero3D() {
    const globalMouse = useRef({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const t = useTranslations("PowerLink.Hero");

    // NUEVO ESTADO: Rastreadores de optimización e interfaz
    const [isVisible, setIsVisible] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Función para verificar el tamaño de pantalla
        const checkMobile = () => setIsMobile(window.innerWidth < 768);

        // Revisamos inmediatamente al cargar
        checkMobile();

        // Rastreador de redimensionamiento de ventana
        window.addEventListener("resize", checkMobile);

        // Observador de visibilidad (Intersection Observer para optimización GPU/CPU)
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { rootMargin: "100px" } // Margen para despertar el canvas antes de ser visible
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        // Rastreador del ratón (Parallax)
        const handleMouseMove = (e: MouseEvent) => {
            globalMouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            globalMouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
        };
        window.addEventListener("mousemove", handleMouseMove);

        // Limpieza de eventos
        return () => {
            window.removeEventListener("resize", checkMobile);
            window.removeEventListener("mousemove", handleMouseMove);
            observer.disconnect();
        };
    }, []);

    return (
        <div ref={containerRef} className="relative w-full h-[55vh] min-h-[500px] md:h-[75vh] rounded-xl overflow-hidden border border-border bg-gradient-to-b from-muted/20 to-background flex items-center justify-center">

            {/* CAPA HTML/UI */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-start pt-16 md:pt-20 pointer-events-none text-center px-4">
                <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-mono font-medium text-blue-400 mb-4 backdrop-blur-md">
                    <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse mr-2" />
                    {t("firmware")}
                </div>
                <h2 className="text-4xl md:text-6xl font-bold font-sans tracking-tighter mb-4 text-slate-900 dark:text-slate-100 drop-shadow-sm">
                    {t("title")}
                </h2>
                <p className="max-w-[600px] text-muted-foreground text-sm md:text-base leading-relaxed">
                    {t("description")}
                </p>
            </div>

            {/* CAPA WEBGL */}
            <div className="absolute inset-0 z-0 pointer-events-none lg:pointer-events-auto touch-none">
                <Canvas 
                    frameloop={isVisible ? "always" : "demand"}
                    camera={{ position: [0, 0, 4.5], fov: 45 }} 
                    dpr={[1, 2]}
                >
                    <ambientLight intensity={0.5} />
                    <Environment preset="city" />

                    <Suspense fallback={null}>
                        <PresentationControls
                            global
                            polar={[-1, 1]}
                            azimuth={[-2, 2]}
                            snap={true}
                            cursor={true}
                            speed={3}
                        >
                            <Float
                                rotationIntensity={0.3}
                                floatIntensity={1.5}
                                floatingRange={[0, 0.05]}
                                speed={1.2}
                            >
                                {/* Pasamos la bandera isMobile a los componentes 3D */}
                                <AnimatedModelGroup mouseRef={globalMouse} isMobile={isMobile}>
                                    <Center>
                                        <ESP32Model isMobile={isMobile} />
                                    </Center>
                                </AnimatedModelGroup>
                            </Float>
                        </PresentationControls>
                    </Suspense>

                    <ContactShadows
                        // La sombra también debe bajar si el modelo baja en móviles
                        position={[0, isMobile ? -1.8 : -1, 0]}
                        opacity={0.3}
                        scale={isMobile ? 8 : 12}
                        blur={2.5}
                        far={4}
                        frames={1}
                        resolution={256}
                    />
                </Canvas>
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden lg:flex items-center gap-2 text-xs font-mono text-muted-foreground/60 pointer-events-none">
                <span>{t("dragInstruction")}</span>
            </div>
        </div>
    );
}