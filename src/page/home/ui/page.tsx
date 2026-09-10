'use client'

import Image from 'next/image';

import bottlePath from '@/src/widgets/example-blocks/ui/bottle.png'
import { useLayoutEffect, useRef } from "react";

import { BLOCKS_INFO } from "@/src/shared/api/app-info.api";
import Block1 from "@/src/widgets/example-blocks/ui/block1";

import { gsap } from "gsap";
import { HeroBanner } from '@/src/widgets/hero-banner';


export default function HomePage() {
    const blocks = BLOCKS_INFO.data

    const bottleRef = useRef<HTMLImageElement>(null)
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
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
                { rotate: 10, width: 184 * 1.67 },
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
    }, []);

    return (
        <div
            className="relative main-page overflow-hidden"
            id="main-section"
            ref={containerRef}
        >
            <Image
                src={bottlePath}
                alt="bottle"
                id={'bottle'}
                ref={bottleRef}
                className="absolute pointer-events-none will-change-transform z-3 h-auto aspect-284/853"
            />

            <div>
                <HeroBanner
                    {...blocks.HERO_BANNER}
                    backgroundColorClassName={'bg-[#E00655]'}
                    dataValueId={0}
                />

                <Block1
                    title={blocks.COMPARE.title}
                    description={blocks.COMPARE.description}
                    items={blocks.COMPARE.items}
                    dataValueId={1}
                />

                <Block1
                    title={blocks.ABOUT_PRODUCT.title}
                    description={blocks.ABOUT_PRODUCT.description}
                    items={blocks.ABOUT_PRODUCT.items}
                    dataValueId={2}
                />

                <Block1
                    title={blocks.CONTACT.title}
                    description={blocks.CONTACT.description}
                    backgroundColorClassName={'bg-accent-foreground'}
                    dataValueId={3}
                />
            </div>
        </div>
    );
}