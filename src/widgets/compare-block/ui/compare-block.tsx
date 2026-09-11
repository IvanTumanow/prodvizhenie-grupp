import { PrettifyText } from "@/src/features/prettify-text";
import { PrettifyTitle } from "@/src/features/prettify-title";
import { SectionContent, SectionContentProps } from "@/src/widgets/section-content";
import { useRef } from "react";
import Star from "./star";
import CardsCompares from "./cards-compares";
import FloatingText from "./floating-text";
import { useRevealTimeline } from "@/src/features/timeline";

interface Props extends SectionContentProps {
    title: string
    subTitle: string
    description: string
    items: { name: string, description: string }[]
    floatingItems: string[]
}

export default function CompareBlock({ title, subTitle, description, floatingItems, items, ...props }: Props) {
    const containerRef = useRef<HTMLElement>(null)

    const tl = useRevealTimeline(containerRef)

    return (
        <SectionContent
            {...props}
            helperClassName={`absolute ${typeof props.dataValueId === 'number' ? 'left-[80%] top-[50%] -translate-x-1/2 -translate-y-1/2' : ''} bg-red-800 w-1 h-1`}
            dataValueId={props.dataValueId}
            backgroundColorClassName={props.backgroundColorClassName}
            ref={containerRef}
        >
            <div className="h-full z-10 relative flex flex-row justify-center items-center">
                <div className="flex flex-col gap-12.5 h-full">
                    <div className="flex flex-col gap-4.5 max-w-[75%]">
                        <PrettifyTitle
                            className={'text-[#E00655]'}
                            tl={tl}
                            as="h6"
                        >
                            {subTitle.toUpperCase()}
                        </PrettifyTitle>

                        <PrettifyTitle
                            tl={tl}
                        >
                            {title}
                        </PrettifyTitle>

                        <PrettifyText
                            tl={tl}
                        >
                            {description}
                        </PrettifyText>
                    </div>

                    <CardsCompares items={items} tl={tl}/>
                </div>

                <div className="mx-5">
                    <Star />
                </div>

                <FloatingText containerRef={containerRef} floatingItems={floatingItems} />
            </div>
        </SectionContent>
    )
}