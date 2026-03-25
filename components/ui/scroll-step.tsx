// components/ui/scroll-step.tsx
"use client";

import { useInView } from "@/hooks/use-in-view"; // Importamos nuestro custom hook
import { useEffect, useRef } from "react";

interface ScrollStepProps {
    stepIndex: number;
    activeStep: number;
    onStepEnter: (index: number) => void;
    children: React.ReactNode;
}

export function ScrollStep({ stepIndex, activeStep, onStepEnter, children }: ScrollStepProps) {
    const ref = useRef<HTMLDivElement>(null);

    // Usamos nuestro hook con el mismo margen mágico para detectar el centro
    const isInView = useInView(ref, { rootMargin: "-50% 0px -50% 0px" });

    useEffect(() => {
        if (isInView) {
            onStepEnter(stepIndex);
        }
    }, [isInView, stepIndex, onStepEnter]);

    const isActive = activeStep === stepIndex;

    return (
        <div
            ref={ref}
            // Las animaciones de opacidad y desenfoque las maneja Tailwind con CSS puro
            className={`min-h-[70vh] md:min-h-[60vh] flex flex-col justify-center transition-all duration-700 ease-out ${isActive ? "opacity-100 blur-none translate-x-0" : "opacity-30 blur-[1px] -translate-x-4"
                }`}
        >
            {children}
        </div>
    );
}