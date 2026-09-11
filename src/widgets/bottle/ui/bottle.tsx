import Image from 'next/image';

import bottlePath from '@/src/widgets/example-blocks/ui/bottle.png'
import { RefObject, useEffect, useRef } from 'react';

import { gsap } from "gsap";

interface Props {
    containerRef: RefObject<HTMLElement | null>
}

export default function Bottle({ containerRef }: Props) {
    const bottleRef = useRef<HTMLImageElement>(null)

    useEffect(() => {
        const container = containerRef.current;
        const bottle = bottleRef.current;

        if (!container || !bottle) return;

        const points: HTMLElement[] = Array.from(
            container.querySelectorAll('span[data-id-value]')
        );

        const ctx = gsap.context(() => {
            type Vector2 = { x: number; y: number };
            type Properties = { rotate: number; width: number };

            const getPointCoords = (point: HTMLElement): Vector2 => {
                const containerRect = container.getBoundingClientRect();
                const pointRect = point.getBoundingClientRect();
                return {
                    x: pointRect.left - containerRect.left
                        + point.offsetWidth / 2 - bottle.offsetWidth / 2,
                    y: pointRect.top - containerRect.top
                        + point.offsetHeight / 2 - bottle.offsetHeight / 2,
                };
            };

            const baseProperties: Properties[] = [
                { rotate: 0, width: 184 * 1 },
                { rotate: 10, width: 184 * 0.9 },
                { rotate: -10, width: 184 * 0.9 },
                { rotate: 10, width: 184 * 0.9 },
            ];

            const mm = gsap.matchMedia();

            const buildTimeline = (coef: number) => {
                const startCoords = getPointCoords(points[0]);
                gsap.set(bottle, { x: startCoords.x, y: startCoords.y, width: 184 * coef });


                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: container,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 2,
                    },
                });

                points.forEach((point, index) => {
                    if (index === 0) return;
                    const coords = getPointCoords(point);
                    tl.to(bottle, {
                        x: coords.x,
                        y: coords.y,
                        rotate: baseProperties[index].rotate,
                        width: baseProperties[index].width * coef,
                        ease: "power2.inOut",
                    });
                });

                return tl;
            };

            mm.add(
                {
                    isDesktop: "(min-width: 1201px)",
                    isTablet: "(max-width: 1200px) and (min-width: 801px)",
                    isSmallTablet: "(max-width: 800px) and (min-width: 501px)",
                    isMobile: "(max-width: 500px)",
                },
                (context) => {
                    const { isDesktop, isTablet, isSmallTablet, isMobile } = context.conditions as Record<string, boolean>;

                    let coef = 1;
                    if (isDesktop) coef = 1.2;
                    else if (isTablet) coef = 1.2;
                    else if (isSmallTablet) coef = 1;
                    else if (isMobile) coef = 0.8;

                    console.log('coef', coef)
                    const tl = buildTimeline(coef);

                    return () => {
                        tl.scrollTrigger?.kill();
                        tl.kill();
                    };
                }
            );
        }, container);

        return () => ctx.revert();
    }, [containerRef]);

    return (
        <>
            <Image
                src={bottlePath}
                alt="bottle"
                id={'bottle'}
                ref={bottleRef}
                className="absolute pointer-events-none will-change-transform z-3 h-auto aspect-284/853"
            />
        </>
    )
}