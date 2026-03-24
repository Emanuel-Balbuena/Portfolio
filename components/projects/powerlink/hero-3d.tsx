"use client";

import { Center, ContactShadows, Environment, Float, PresentationControls, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";

// 1. EL MODELO BASE
function ESP32Model() {
    const { scene } = useGLTF("/models/esp32.glb");
    return <primitive object={scene} scale={40} />;
}

// 2. ANIMACIÓN DE ENTRADA + PARALLAX GLOBAL
// Recibimos la referencia del ratón desde el componente padre
function AnimatedModelGroup({ children, mouseRef }: { children: React.ReactNode, mouseRef: React.MutableRefObject<{ x: number, y: number }> }) {
    const groupRef = useRef<THREE.Group>(null);

    // Valores base congelados (La pose perfecta que encontraste)
    const BASE_ROT_X = 0.17;
    const BASE_ROT_Y = 1.60;
    const PARALLAX_INTENSITY = 0.15; // Qué tanto gira al mover el ratón (0.15 = sutil y premium)

    useFrame((state, delta) => {
        if (groupRef.current) {
            // A. Altura (Levantamiento de entrada)
            groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, -0.60, delta * 2);

            // B. Parallax Global (Seguimiento del ratón)
            // Calculamos hacia dónde debería mirar sumando la pose base + el ratón
            const targetX = BASE_ROT_X + (mouseRef.current.y * PARALLAX_INTENSITY);
            const targetY = BASE_ROT_Y + (mouseRef.current.x * PARALLAX_INTENSITY);

            // Rotamos suavemente hacia ese nuevo objetivo
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, delta * 3);
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, delta * 3);
        }
    });

    // Iniciamos abajo (-6) y con la rotación Z base que descubriste (0.50)
    return (
        <group ref={groupRef} position={[0, -6, 0]} rotation={[BASE_ROT_X, BASE_ROT_Y, 0.50]}>
            {children}
        </group>
    );
}

useGLTF.preload("/models/esp32.glb");

// 3. COMPONENTE PRINCIPAL
export function PowerLinkHero3D() {
    // Referencia de alto rendimiento para guardar el ratón sin causar re-renders
    const globalMouse = useRef({ x: 0, y: 0 });

    // Rastreador global del ratón en la ventana del navegador
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Convierte coordenadas de píxeles a rango [-1, 1]
            globalMouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            globalMouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="relative w-full h-[55vh] min-h-[500px] md:h-[75vh] rounded-xl overflow-hidden border border-border bg-gradient-to-b from-muted/20 to-background flex items-center justify-center">

            {/* CAPA HTML/UI */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-start pt-20 pointer-events-none text-center px-4">
                <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-mono font-medium text-blue-400 mb-4 backdrop-blur-md">
                    <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse mr-2" />
                    Firmware V8.0 Operativo
                </div>
                <h2 className="text-4xl md:text-6xl font-bold font-sans tracking-tighter mb-4 text-slate-900 dark:text-slate-100 drop-shadow-sm">
                    El Origen Físico
                </h2>
                <p className="max-w-[600px] text-muted-foreground text-sm md:text-base leading-relaxed">
                    Un nodo Gateway basado en el ESP32-S3. Conectividad híbrida Wi-Fi/LoRa, memoria tolerante a fallos y procesamiento DSP directo en el borde de la red.
                </p>
            </div>

            {/* CAPA WEBGL */}
            <div className="absolute inset-0 z-0 pointer-events-none lg:pointer-events-auto">
                <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }} dpr={[1, 2]}>
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
                                floatingRange={[0, 0.05]} // Evita que se acerque a las orillas
                                speed={1.2}
                            >
                                {/* Inyectamos la referencia del ratón al grupo animado */}
                                <AnimatedModelGroup mouseRef={globalMouse}>
                                    <Center>
                                        <ESP32Model />
                                    </Center>
                                </AnimatedModelGroup>
                            </Float>
                        </PresentationControls>
                    </Suspense>

                    <ContactShadows
                        position={[0, -1, 0]}
                        opacity={0.3}
                        scale={12}
                        blur={2.5}
                        far={4}
                        frames={1}
                        resolution={256}
                    />
                </Canvas>
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden lg:flex items-center gap-2 text-xs font-mono text-muted-foreground/60 pointer-events-none">
                <span>[Arrastra para inspeccionar]</span>
            </div>
        </div>
    );
}