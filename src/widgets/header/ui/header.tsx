"use client";

import { useRef, useState } from "react";
import { ROUTES } from "@/src/shared/config";
import { IRoute } from "@/src/shared/types";
import Link from "next/link";
import { Burger, MobileMenu } from ".";

export default function Header() {
    const routes: IRoute[] = [
        ROUTES.HOME, ROUTES.USE, ROUTES.ABOUT_PRODUCT, ROUTES.CONTACTS, ROUTES.ABOUT_FUND
    ];

    const [isOpen, setIsOpen] = useState(false);
    const tl = useRef<gsap.core.Timeline | null>(null);

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
                <Burger toggleMenu={toggleMenu} isOpen={isOpen} />
            </nav>

            {/* --- МОБИЛЬНОЕ МЕНЮ (GSAP) --- */}
            <MobileMenu setIsOpen={setIsOpen} isOpen={isOpen} routes={routes} tl={tl} />
        </header>
    );
}
