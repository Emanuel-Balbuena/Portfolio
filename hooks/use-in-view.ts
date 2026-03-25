// hooks/use-in-view.ts
import { RefObject, useEffect, useState } from "react";

export function useInView(
    ref: RefObject<HTMLElement | null>,
    options: IntersectionObserverInit = { rootMargin: "-50% 0px -50% 0px" }
) {
    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
        const target = ref.current;
        if (!target) return;

        // Instanciamos el observador nativo
        const observer = new IntersectionObserver(([entry]) => {
            // entry.isIntersecting será true cuando el elemento cruce el rootMargin
            setIntersecting(entry.isIntersecting);
        }, options);

        observer.observe(target);

        // Cleanup: Desconectamos el observador cuando el componente se desmonta
        return () => {
            observer.disconnect();
        };
    }, [ref, options]);

    return isIntersecting;
}