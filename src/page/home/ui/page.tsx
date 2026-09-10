'use client'

import Image from 'next/image';

import bottlePath from '@/src/widgets/example-blocks/ui/bottle.png'
import { useLayoutEffect, useRef } from "react";

import { BLOCKS_INFO } from "@/src/shared/api/app-info.api";
import Block1 from "@/src/widgets/example-blocks/ui/block1";

import { gsap } from "gsap";


export default function HomePage() {
    const blocks = BLOCKS_INFO.data

    const bottleRef = useRef<HTMLImageElement>(null)
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const container = containerRef.current;
        const bottle = bottleRef.current;

        if (!container || !bottle) return;

        const points: HTMLElement[] = Array.from(container.querySelectorAll('span[data-id-value]'));

        const ctx = gsap.context(() => {
            type Vector2 = {
                x: number,
                y: number
            }

            const getPointCoords = (point: HTMLElement): Vector2 => {
                const containerRect = container.getBoundingClientRect();
                const pointRect = point.getBoundingClientRect();
                return {
                    x: pointRect.left - containerRect.left + (point.offsetWidth / 2) - (bottle.offsetWidth / 2),
                    y: pointRect.top - containerRect.top + (point.offsetHeight / 2) - (bottle.offsetHeight / 2),
                };
            };

            const startCoords: Vector2 = getPointCoords(points[0]);
            gsap.set(bottle, { x: startCoords.x, y: startCoords.y });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 2,
                }
            });

            points.forEach((point, index) => {
                if (index === 0) return;

                const coords: Vector2 = getPointCoords(point);

                type Properties = {
                    rotate: number
                    scale: number
                }

                const properties: Properties[] = [
                    { rotate: 0, scale: 1 }, { rotate: 10, scale: 0.9 },
                    { rotate: -10, scale: 0.9 }, { rotate: 10, scale: 1.67 },
                ]

                tl.to(bottle, {
                    x: coords.x,
                    y: coords.y,
                    rotate: properties[index].rotate,
                    scale: properties[index].scale,
                    ease: "power2.inOut",
                });
            });

        }, container);

        return () => {
            ctx.revert();
        };
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
                width={284 / 1.3}
                height={853 / 1.3}
                id={'bottle'}
                ref={bottleRef}
                className="absolute pointer-events-none will-change-transform z-1"
            />

            <div>
                <Block1
                    title={blocks.HERO_BANNER.title}
                    items={blocks.HERO_BANNER.items}
                    backgroundColor={'bg-[#E00655]'}
                    dataId="block"
                    helperId={0}
                />

                <Block1
                    title={blocks.COMPARE.title}
                    description={blocks.COMPARE.description}
                    items={blocks.COMPARE.items}
                    dataId="block"
                    helperId={1}
                />

                <Block1
                    title={blocks.ABOUT_PRODUCT.title}
                    description={blocks.ABOUT_PRODUCT.description}
                    items={blocks.ABOUT_PRODUCT.items}
                    dataId="block"
                    helperId={2}
                />

                <Block1
                    title={blocks.CONTACT.title}
                    description={blocks.CONTACT.description}
                    backgroundColor={'bg-accent-foreground'}
                    dataId="block"
                    helperId={3}
                />
            </div>
        </div>
    );
}