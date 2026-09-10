'use client'

import { Card, CardDescription, CardHeader, CardTitle } from "@/shadcn/components/ui/card";
import { useLayoutEffect, useRef } from "react";
import gsap from 'gsap'

import SplitText from 'gsap/SplitText'
import { SectionContent, SectionContentProps } from "@/src/widgets/section-content";

interface Props extends SectionContentProps {
    title: string
    description?: string
    items?: { name: string, description?: string }[]
}

export default function Block1({ title, description, items, ...props }: Props) {
    const titleRef = useRef(null)
    const containerRef = useRef(null)


    useLayoutEffect(() => {
        if (!containerRef.current || !titleRef.current) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "bottom bottom",
                    pinSpacing: false,
                    pin: true,
                    scrub: true,
                },
            })

            tl.fromTo
                (
                    containerRef.current,
                    { opacity: 1, scale: 1, filter: "blur(0px)", y: 0 },
                    { opacity: 1, scale: 1.01, filter: "blur(1px)", y: 0 }
                )


            const split = SplitText.create(titleRef.current, {
                type: "words,lines",
                mask: "lines",
            });

            gsap.from(split.words, {
                x: "0",
                y: "-40",
                duration: 0.3,
                delay: props.backgroundColorClassName ? 0.7 : 0,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom-=60%",
                    end: "top center",
                    toggleActions: "play none restart reverse",
                },
                stagger: 0.1,
            })
        }, containerRef);

        return () => ctx.revert();
    }, [title, description, props.backgroundColorClassName]);


    const test: string[] = ['left-[50%] top-[50%]', 'left-[80%] top-[50%]', 'left-[20%] top-[50%]', 'left-[70%] top-[100%]',]

    return (
        <>
            <SectionContent
                ref={containerRef}
                {...props}
                helperClassName={`absolute ${typeof props.dataValueId === 'number' ? test[props.dataValueId] : ''} bg-red-800 w-1 h-1`}
                dataValueId={props.dataValueId}
                backgroundColorClassName={props.backgroundColorClassName}
            >
                <div className="max-w-125 h-full">
                    <h2 ref={titleRef} className={`${props.backgroundColorClassName ? 'text-accent' : ''}`}>{title}</h2>
                    <p className={`${props.backgroundColorClassName ? 'text-accent' : ''}`}>{description}</p>

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