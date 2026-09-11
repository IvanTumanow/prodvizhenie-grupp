import { RefObject, useLayoutEffect } from "react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function useScrollAway(refForFloating: RefObject<HTMLElement | null>) {
    useLayoutEffect(() => {
        if (!refForFloating.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: refForFloating.current,
                start: "bottom bottom",
                end: "bottom top",
                pinSpacing: false,
                pin: true,
                scrub: 1,
            },
        });

        tl.to(refForFloating.current, {
            yPercent: -10,
            scaleY: 1.01,
            rotation: 0.5,
            ease: "power1.out", 
        });

        return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
        };
    }, [refForFloating]);
}
