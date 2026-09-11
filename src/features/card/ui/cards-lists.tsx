import { ComponentPropsWithoutRef } from "react";
import Card from "./card";
import { cn } from "cn";

interface Props extends ComponentPropsWithoutRef<'div'> {
    items: { name: string, description: string }[]
    tl: gsap.core.Timeline | null
    cardProps?: ComponentPropsWithoutRef<'div'>
}

export default function CardsLists({ items, tl, cardProps, ...props }: Props) {
    return (
        <>
            {
                items && items.length > 0 &&
                <div className={cn("flex flex-row gap-6", props.className)} {...props}>
                    {
                        items.map(item => (
                            <Card
                                key={`card-compare-${item.name}`}
                                tl={tl}
                                title={item.name}
                                description={item.description}
                                {...cardProps}
                            />
                        ))
                    }
                </div>
            }
        </>
    )
}