import { IRoute } from "@/src/shared/types";
import Link from "next/link";

interface Props {
    title: string
    routes: IRoute[]
}

export default function FooterTab({ title, routes }: Props) {
    return (
        <>
            <div className="flex flex-col gap-3">
                <h3 className="text-accent">{title}</h3>
                <div className="flex flex-col gap-1">
                    {
                        routes.map((route, index) =>
                            <Link
                                key={`footer-tab-${route.slug}-${index}`}
                                href={route.slug}
                                className="text-muted-foreground max-w-100">
                                {route.name}
                            </Link>
                        )
                    }
                </div>
            </div>
        </>
    )
}