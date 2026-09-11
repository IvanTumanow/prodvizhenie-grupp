import { RefObject, useEffect } from "react";
import { gsap } from 'gsap'

export function useFilledBG<T extends HTMLElement>(ref: RefObject<T | null>) {
    useEffect(() => {
        if (!ref.current) return;

        const fill = gsap.to(ref.current, {
            duration: 1.5,
            ease: "power2.out",
            width: "200%",
            height: '200%',
            scrollTrigger: {
                trigger: ref.current,
                start: "top bottom",
                end: "top center",
                scrub: false,
            }
        });

        return () => {
            fill.scrollTrigger?.kill();
            fill.kill();
        };
    }, [ref])
}