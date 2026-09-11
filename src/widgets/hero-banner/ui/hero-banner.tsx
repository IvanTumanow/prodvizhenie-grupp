import { PrettifyTitle } from "@/src/features/prettify-title";
import { SectionContent, SectionContentProps } from "@/src/widgets/section-content";
import { useRef } from "react";
import { LeadersLines } from "..";
import { useRevealTimeline } from "@/src/features/timeline";

interface Props extends SectionContentProps {
    title: string
    subTitle: string
    items: { name: string }[]
}

export default function HeroBanner({ title, subTitle, items, ...props }: Props) {
    const containerRef = useRef<HTMLElement>(null)

    const tl = useRevealTimeline(containerRef)

    return (
        <SectionContent
            {...props}
            helperClassName={`absolute ${typeof props.dataValueId === 'number' ? 'left-[50%] top-[65%] -translate-x-1/2 -translate-y-1/2' : ''} bg-red-800 w-1 h-1`}
            dataValueId={props.dataValueId}
            backgroundColorClassName={props.backgroundColorClassName}
            ref={containerRef}
        >
            <div className="w-full h-full z-10 relative">
                <div className="flex flex-col justify-center items-center my-12.5">
                    <PrettifyTitle
                        as='h1'
                        className={`${props.backgroundColorClassName ? 'text-accent' : ''}`}
                        tl={tl}
                    >
                        {title.toUpperCase()}
                    </PrettifyTitle>

                    <PrettifyTitle
                        className={`text-shadow-[0_20px_0_color-mix(in_srgb,var(--accent)_10%,transparent),0_10px_0_color-mix(in_srgb,var(--accent)_20%,transparent)] text-6xl ${props.backgroundColorClassName ? 'text-accent' : ''}`}
                        tl={tl}
                    >
                        {subTitle.toUpperCase()}
                    </PrettifyTitle>
                </div>


                <LeadersLines items={items} tl={tl} />
            </div>
        </SectionContent>
    )
}