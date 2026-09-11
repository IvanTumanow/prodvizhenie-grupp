import { RefObject, useEffect } from "react";
import { gsap } from 'gsap'

export function useFilledBG<T extends HTMLElement>(ref: RefObject<T | null>) {
    useEffect(() => {
        if (!ref.current) return;

        gsap.set(ref.current, { scale: 0 })

        const fill = gsap.to(ref.current, {
            duration: 2.5,
            ease: "power2.out",
            scale: 5,
            scrollTrigger: {
                trigger: ref.current.parentElement,
                start: "top bottom-=10%",
                end: "top center",
                scrub: false,
                toggleActions: "play none none reverse",
            }
        });

        return () => {
            fill.scrollTrigger?.kill();
            fill.kill();
        };
    }, [ref])
}