import { RefObject, useLayoutEffect } from "react";
import { gsap } from 'gsap'

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
                scrub: true,
            },
        })

        tl.fromTo
            (
                refForFloating.current,
                { opacity: 1, scale: 1, y: 0 },
                { opacity: 1, scale: 0.99, y: 0 }
            )

        return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
        };
    }, [refForFloating])
}