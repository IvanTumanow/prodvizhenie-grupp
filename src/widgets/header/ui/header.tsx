"use client";

import { useEffect, useRef, useState } from "react";
import { ROUTES } from "@/src/shared/config";
import { IRoute } from "@/src/shared/types";
import Link from "next/link";
import gsap from "gsap";

export default function Header() {
    const routes: IRoute[] = [
        ROUTES.HOME, ROUTES.USE, ROUTES.ABOUT_PRODUCT, ROUTES.CONTACTS, ROUTES.ABOUT_FUND
    ];

    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const linksRef = useRef<HTMLDivElement>(null);
    const tl = useRef<gsap.core.Timeline | null>(null);

    useEffect(() => {
        if (!menuRef.current || !linksRef.current) return;

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
    }, []);

    useEffect(() => {
        if (isOpen) {
            tl.current?.play();
            document.body.style.overflow = "hidden";
        } else {
            tl.current?.reverse();
            document.body.style.overflow = "";
        }
    }, [isOpen]);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 w-full p-4 flex justify-between md:justify-center items-center">

            {/* --- ДЕСТКОПНАЯ НАВИГАЦИЯ --- */}
            <nav
                className="
                z-60 flex flex-row items-center gap-10 p-3 md:px-12.5 md:py-5 rounded-full md:mx-auto w-fit
                backdrop-blur-sm
                bg-[linear-gradient(180deg,rgba(255,255,255,0.4)_0%,rgba(255,255,255,0.45)_100%)]
                border border-white/20
                shadow-[0_8px_32px_0_rgba(0,0,0,0.08),inset_0_1px_1px_0_rgba(255,255,255,0.3)]
                transition-all duration-300"
            >
                {routes.map((route, index) => (
                    <Link
                        key={`header-route-${index}`}
                        href={route.slug}
                        className="hidden md:flex font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)] transition-colors hover:text-black/70"
                    >
                        {route.name}
                    </Link>
                ))}

                {/* --- КНОПКА БУРГЕРА  --- */}
                <button
                    onClick={toggleMenu}
                    className="relative cursor-pointer flex flex-col justify-between w-4 h-4 md:hidden focus:outline-none"
                    aria-label="Toggle menu"
                >
                    <span className={`w-full h-0.5 bg-black transition-all duration-300 origin-left ${isOpen ? 'rotate-45 translate-x-1' : ''}`} />
                    <span className={`w-full h-0.5 bg-black transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
                    <span className={`w-full h-0.5 bg-black transition-all duration-300 origin-left ${isOpen ? '-rotate-45 translate-x-1' : ''}`} />
                </button>
            </nav>

            {/* --- МОБИЛЬНОЕ МЕНЮ (GSAP) --- */}
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
        </header>
    );
}
