'use client'

import { IRoute } from "@/src/shared/types";
import Link from "next/link";
import { RefObject, useEffect, useRef } from "react";
import gsap from "gsap";

interface Props {
    routes: IRoute[]
    setIsOpen: (state: boolean) => void
    isOpen: boolean
    tl: RefObject<gsap.core.Timeline | null>
}

export default function MobileMenu({ routes, setIsOpen, isOpen, tl }: Props) {
    const menuRef = useRef<HTMLDivElement>(null);
    const linksRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!menuRef.current || !linksRef.current || !tl) return;

        const menuEl = menuRef.current;
        const linksEl = linksRef.current;

        const ctx = gsap.context(() => {
            tl.current = gsap.timeline({ paused: true })
                .to(menuEl, {
                    clipPath: "circle(141.4% at 100% 0%)",
                    opacity: 1,
                    pointerEvents: "all",
                    duration: 0.6,
                    ease: "power3.inOut"
                })
                .fromTo(
                    linksEl.children,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: "power2.out" },
                    "-=0.2"
                );
        });

        return () => ctx.revert();
    }, [tl]);

    useEffect(() => {
        if (tl) {
            if (isOpen) {
                tl.current?.play();
                document.body.style.overflow = "hidden";
            } else {
                tl.current?.reverse();
                document.body.style.overflow = "";
            }
        }
    }, [isOpen, tl]);

    return (
        <>
            <div
                ref={menuRef}
                style={{ clipPath: "circle(0% at 100% 0%)" }}
                className="
                fixed inset-0 z-50 opacity-0 pointer-events-none
                flex flex-col items-center justify-center
                bg-white/80 backdrop-blur-md
                w-full h-screen md:hidden"
            >
                <nav ref={linksRef} className="flex flex-col items-center gap-8 text-2xl font-semibold">
                    {routes.map((route, index) => (
                        <Link
                            key={`mobile-route-${index}`}
                            href={route.slug}
                            onClick={() => setIsOpen(false)}
                            className="hover:text-black/60 transition-colors"
                        >
                            {route.name}
                        </Link>
                    ))}
                </nav>
            </div>
        </>
    )
}