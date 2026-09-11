'use client'

import { SectionContent, SectionContentProps } from "../../section-content";
import { useRevealTimeline } from "@/src/features/timeline";
import { useRef } from "react";

export default function Footer({ ...props }: SectionContentProps) {
    const containerRef = useRef<HTMLElement>(null)
    const tl = useRevealTimeline(containerRef)

    return (
        <footer>
            <SectionContent
                {...props}
                helperClassName={`absolute ${typeof props.dataValueId === 'number' ? 'left-[25%] top-[50%] -translate-x-1/2 -translate-y-1/2' : ''} bg-red-800 w-1 h-1`}
                dataValueId={props.dataValueId}
                backgroundColorClassName={props.backgroundColorClassName}
                ref={containerRef}
                className="h-fit"
            >

                <div className="flex flex-col w-full h-fit z-10 relative">
                    <h1>This is footer</h1>
                    <h1>This is footer</h1>
                    <h1>This is footer</h1>
                    <h1>This is footer</h1>
                    <h1>This is footer</h1>
                    <h1>This is footer</h1>
                    <h1>This is footer</h1>
                </div>
            </SectionContent>
        </footer>
    )
}