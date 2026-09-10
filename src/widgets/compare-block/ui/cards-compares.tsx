import { RefObject } from "react";
import CardCompare from "./card-compare";

interface Props {
    items: { name: string, description: string }[]
    containerRef: RefObject<HTMLElement | null>;
}

export default function CardsCompares({ items, containerRef }: Props) {
    return (
        <>
            {
                items && items.length > 0 &&
                <div className="flex flex-row gap-6">
                    {
                        items.map(item => (
                            <CardCompare
                                key={`card-compare-${item.name}`}
                                containerRef={containerRef}
                                title={item.name}
                                description={item.description}
                            />
                        ))
                    }
                </div>
            }
        </>
    )
}