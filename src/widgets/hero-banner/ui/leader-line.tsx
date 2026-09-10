import { PrettifyText } from "@/src/features/prettify-text";
import { ReactNode, RefObject, useLayoutEffect, useRef } from "react";
import { gsap } from 'gsap';

interface Props {
    children: ReactNode;
    isReverse?: boolean;
    className?: string;
    containerRef: RefObject<HTMLElement | null>;
}

export default function LeaderLine({ children, isReverse, containerRef, className }: Props) {
    const width = 150 + (typeof children === 'string' ? children.length * 10 : 38);
    const ref = useRef<HTMLSpanElement>(null);
    const svgRef = useRef<HTMLElement>(null);

    const bigCircleRef = useRef<SVGCircleElement>(null);
    const smallCircleRef = useRef<SVGCircleElement>(null);
    const lineRef = useRef<SVGPathElement>(null);

    useLayoutEffect(() => {
        if (!svgRef.current || !lineRef.current) return;
        const lineLength = lineRef.current.getTotalLength();

        const tl = gsap.timeline({
            defaults: { ease: "power2.out", duration: 0.6 }
        });

        gsap.set(lineRef.current, {
            strokeDasharray: lineLength,
            strokeDashoffset: lineLength
        });
        gsap.set(bigCircleRef.current, {
            scale: 0
        });

        gsap.set(smallCircleRef.current, {
            scale: 0
        });

        tl.to(bigCircleRef.current, { scale: 1, duration: 0.4 })
            .to(lineRef.current, { strokeDashoffset: 0, duration: 0.4 })
            .to(smallCircleRef.current, { scale: 1, duration: 0.3 });

        return () => {
            tl.kill();
        };
    }, [width]);

    return (
        <span className={`relative w-fit ${className}`} ref={ref}>
            <PrettifyText
                containerRef={containerRef}
                className={`text-shadow-xs text-accent absolute -top-4 ${isReverse ? 'left-0' : 'right-0'}`}
            >
                {children}
            </PrettifyText>

            <i ref={svgRef} className={isReverse ? "inline-block rotate-180" : "inline-block"}>
                <svg width={width} height="25" viewBox={`0 0 ${width} 25`} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle
                        ref={bigCircleRef}
                        cx="12.5"
                        cy="12.5"
                        r="11"
                        stroke="#F5F0E1"
                        strokeWidth="3"
                    />

                    <path
                        ref={lineRef}
                        d={`M 13 12.5 L ${width} 12.5`}
                        stroke="#F5F0E1"
                        strokeWidth="2"
                    />

                    <circle
                        ref={smallCircleRef}
                        cx="12.5"
                        cy="12.5"
                        r="4"
                        fill="#F5F0E1"
                    />
                </svg>
            </i>
        </span>
    );
}
