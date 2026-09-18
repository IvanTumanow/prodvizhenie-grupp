import { ROUTES } from "@/src/shared/config";
import { IRoute } from "@/src/shared/types";
import Link from "next/link";

export default function Header() {
    const routes: IRoute[] = [
        ROUTES.HOME, ROUTES.USE, ROUTES.ABOUT_PRODUCT, ROUTES.CONTACTS, ROUTES.ABOUT_FUND
    ]

    return (
        <header className="fixed top-0 left-0 right-0 z-50 w-full p-4 flex justify-center">
            <nav className="
                flex flex-row items-center gap-10 px-12.5 py-5 rounded-full mx-auto w-fit
                backdrop-blur-sm
                bg-[linear-gradient(180deg,rgba(255,255,255,0.4)_0%,rgba(255,255,255,0.05)_100%)]
                border border-white/20
                shadow-[0_8px_32px_0_rgba(0,0,0,0.08),inset_0_1px_1px_0_rgba(255,255,255,0.3)]
                transition-all duration-300
            ">
                {
                    routes.map((route, index) =>
                        <Link
                            key={`header-route-${index}`}
                            href={route.slug}
                            className="font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)] transition-colors"
                        >
                            {route.name}
                        </Link>
                    )
                }
            </nav>
        </header>
    )
}
