import LeaderLine from "./leader-line";

interface Props {
    items: { name: string }[]
    tl: gsap.core.Timeline | null
}

export default function LeadersLines({ items, tl }: Props) {
    return (
        <>
            {
                items && items.length > 0 &&
                <div className="flex flex-col justify-end items-end gap-25 absolute top-[80%] left-[39%] xl:top-[70%] sm:top-[60%] lg:top-[80%] sm:left-[50%] md:top-[80%] -translate-x-1/2 -translate-y-1/2">
                    {
                        items.map((item, index) => {
                            const isReverse = (index + 1) % 2 !== 0

                            return (
                                <LeaderLine
                                    key={`leader-line-hero-${item.name}`} isReverse={isReverse}
                                    className={`${isReverse ? 'sm:right-64' : 'sm:left-46 md:left-36 lg:left-46'}`}
                                    tl={tl}
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