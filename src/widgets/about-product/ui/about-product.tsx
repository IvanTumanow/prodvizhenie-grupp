import { useRevealTimeline } from "@/src/features/timeline";
import { useRef } from "react";
import { SectionContent, SectionContentProps } from "@/src/widgets/section-content";
import { CardsLists } from "@/src/features/card";
import { PrettifyText } from "@/src/features/prettify-text";
import { PrettifyTitle } from "@/src/features/prettify-title";
import { Circles } from "..";

interface Props extends SectionContentProps {
    title: string
    description: string
    items: { name: string, description: string }[]
}

export default function AboutProductBlock({ title, description, items, ...props }: Props) {
    const containerRef = useRef<HTMLElement>(null)
    const tl = useRevealTimeline(containerRef)

    return (
        <SectionContent
            {...props}
            helperClassName={`absolute ${typeof props.dataValueId === 'number' ? 'left-[25%] top-[50%] -translate-x-1/2 -translate-y-1/2' : ''}`}
            dataValueId={props.dataValueId}
            backgroundColorClassName={props.backgroundColorClassName}
            ref={containerRef}
        >

            <div className="flex flex-row w-full h-full z-10 relative">
                <Circles tl={tl}/>

                <div className="flex flex-col gap-12.5 w-[50%]">
                    <div className="flex flex-col gap-4">
                        <PrettifyTitle
                            className={`${props.backgroundColorClassName ? 'text-accent' : ''}`}
                            tl={tl}
                        >
                            {title}
                        </PrettifyTitle>

                        <PrettifyText
                            className={`${props.backgroundColorClassName ? 'text-accent' : ''}`}
                            tl={tl}
                        >
                            {description}
                        </PrettifyText>
                    </div>

                    <CardsLists
                        items={items}
                        tl={tl}
                        cardProps={{
                            className: 'basis-[48%] grow [&_h2]:text-2xl w-full'
                        }}
                        className="flex flex-wrap gap-5"
                    />
                </div>
            </div>
        </SectionContent>
    )
}