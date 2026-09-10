import { RefObject } from "react";
import LeaderLine from "./leader-line";

interface Props {
    items: { name: string }[]
    containerRef: RefObject<HTMLElement | null>
}

export default function LeadersLines({ items, containerRef }: Props) {
    return (
        <>
            {
                items && items.length > 0 &&
                <div className="flex flex-col justify-end items-end gap-25 absolute top-[60%] left-[50%] -translate-x-1/2 -translate-y-1/2">
                    {
                        items.map((item, index) => {
                            const isReverse = (index + 1) % 2 !== 0

                            return (
                                <LeaderLine
                                    key={`leader-line-hero-${item.name}`} isReverse={isReverse}
                                    className={isReverse ? 'right-64' : 'left-46'}
                                    containerRef={containerRef}
                                >
                                    {item.name}
                                </LeaderLine>
                            )
                        })
                    }
                </div>
            }
        </>
    )
}