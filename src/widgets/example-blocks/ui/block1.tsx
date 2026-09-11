'use client'

import { Card, CardDescription, CardHeader, CardTitle } from "@/shadcn/components/ui/card";
import { useRef } from "react";

import { SectionContent, SectionContentProps } from "@/src/widgets/section-content";
import { PrettifyTitle } from "@/src/features/prettify-title";
import { PrettifyText } from "@/src/features/prettify-text";
import { useRevealTimeline } from "@/src/features/timeline";

interface Props extends SectionContentProps {
    title: string
    description?: string
    items?: { name: string, description?: string }[]
}

export default function Block1({ title, description, items, ...props }: Props) {
    const containerRef = useRef<HTMLElement>(null)
    const tl = useRevealTimeline(containerRef)



    const test: string[] = [
        'left-[50%] top-[65%] -translate-x-1/2 -translate-y-1/2',
        'left-[80%] top-[50%] -translate-x-1/2 -translate-y-1/2',
        'left-[20%] top-[50%] -translate-x-1/2 -translate-y-1/2',
        'left-[70%] top-[100%] -translate-x-1/2 -translate-y-1/2',
    ];

    return (
        <>
            <SectionContent
                {...props}
                helperClassName={`absolute ${typeof props.dataValueId === 'number' ? test[props.dataValueId] : ''} bg-red-800 w-1 h-1`}
                dataValueId={props.dataValueId}
                backgroundColorClassName={props.backgroundColorClassName}
                ref={containerRef}
            >
                <div className="h-full z-10 relative">
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

                    {
                        items && items.length > 0 &&
                        <div className="flex flex-col gap-1.5">
                            {
                                items.map(item => (
                                    <Card
                                        key={`item-${item.name}`}
                                        className="w-full max-w-sm pt-0"
                                    >
                                        <CardHeader>
                                            <CardTitle>{item.name}</CardTitle>
                                            {
                                                item?.description && <CardDescription>{item.description}</CardDescription>
                                            }
                                        </CardHeader>
                                    </Card>
                                ))
                            }
                        </div>
                    }
                </div>
            </SectionContent>
        </>
    )
}