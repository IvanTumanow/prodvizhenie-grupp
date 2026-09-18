import { useEffect, useRef } from "react";
import { gsap } from 'gsap'
import {LogoFund as LogoFundSVG} from '@/src/entities/fund-logo'

interface Props {
    tl: gsap.core.Timeline | null
}

export default function LogoFund({ tl }: Props) {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!tl || !svgRef.current) return;
        const paths = svgRef.current.querySelectorAll("path");

        gsap.set(paths, {
            opacity: 0,
            scale: 0,
            transformOrigin: "center center"
        });

        const appearance = gsap.timeline();

        appearance.to(paths, {
            opacity: 1,
            scale: 1.15,
            duration: 0.4,
            stagger: 0.04,
            ease: "power2.out"
        })
            .to(paths, {
                scale: 1,
                duration: 0.3,
                stagger: 0.02,
                ease: "sine.inOut"
            }, "-=0.5");
        tl.add(appearance, 0);

    }, [tl]);

    return (
        <LogoFundSVG
            ref={svgRef}
        />
    )
}