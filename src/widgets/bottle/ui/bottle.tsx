import Image from 'next/image';

import bottlePath from '@/public/bottle.png'
import { RefObject, useEffect, useRef } from 'react';

import { gsap } from "gsap";
import { getPoints, getPointsCoords as getPointsCoordsService, getResponsivibility, Properties } from '../model';

interface Props {
    containerRef: RefObject<HTMLElement | null>
}

export default function Bottle({ containerRef }: Props) {
    const bottleRef = useRef<HTMLImageElement>(null)

    useEffect(() => {
        const container = containerRef.current;
        const bottle = bottleRef.current;

        if (!container || !bottle) return;


        const points: HTMLElement[] = getPoints({ container })

        const ctx = gsap.context(() => {
            const getPointsCoords = getPointsCoordsService({container, bottle})

            const baseProperties: Properties[] = [
                { rotate: 0, width: 184 * 1 },
                { rotate: 10, width: 184 * 0.9 },
                { rotate: -10, width: 184 * 0.9 },
                { rotate: 10, width: 184 * 0.9 },
            ];

            const buildTimeline = (coef: number) => {
                const startCoords = getPointsCoords(points[0]);
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
                    const coords = getPointsCoords(point);
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

            getResponsivibility({buildTimeline})
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