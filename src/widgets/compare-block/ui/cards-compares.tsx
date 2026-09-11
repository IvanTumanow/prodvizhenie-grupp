import CardCompare from "./card-compare";
import {gsap} from 'gsap'

interface Props {
    items: { name: string, description: string }[]
    tl: gsap.core.Timeline | null
}

export default function CardsCompares({ items, tl }: Props) {
    return (
        <>
            {
                items && items.length > 0 &&
                <div className="flex flex-row gap-6">
                    {
                        items.map(item => (
                            <CardCompare
                                key={`card-compare-${item.name}`}
                                tl={tl}
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