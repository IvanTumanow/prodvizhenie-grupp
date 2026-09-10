'use client'

import { Card, CardDescription, CardHeader, CardTitle } from "@/shadcn/components/ui/card";
import { cn } from "cn";
import { ComponentPropsWithRef, CSSProperties, useLayoutEffect, useRef } from "react";
import gsap from 'gsap'

import SplitText from 'gsap/SplitText'

interface Props extends ComponentPropsWithRef<'section'> {
    title: string
    description?: string
    items?: { name: string, description?: string }[]
    backgroundColor?: string
    dataId: string
    helperId: number
}

export default function Block1({ title, description, items, backgroundColor, dataId, helperId, ...props }: Props) {
    const titleRef = useRef(null)
    const filledContainedRed = useRef<HTMLDivElement>(null);
    const containerRef = useRef(null)


    useLayoutEffect(() => {
        if (!containerRef.current || !titleRef.current) return;

        const ctx = gsap.context(() => {
            if (filledContainedRed.current) {
                gsap.to(filledContainedRed.current, {
                    duration: 1.5,
                    ease: "power2.out",
                    width: "200%",
                    height: '200%',
                    scrollTrigger: {
                        trigger: filledContainedRed.current,
                        start: "top bottom",
                        end: "top center",
                        scrub: false,
                    }
                });
            }

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
                delay: backgroundColor ? 0.7 : 0,
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
    }, [title, description, backgroundColor]);


    const test: string[] = ['left-[50%] top-[50%]', 'left-[80%] top-[50%]', 'left-[20%] top-[50%]', 'left-[70%] top-[100%]',]

    return (
        <section
            className={
                cn('bg-accent',
                    'w-full h-screen p-10 shadow-2xl relative overflow-hidden',
                    props?.className)
            }

            ref={containerRef}
            {...props}
        >
            <span data-id={dataId} data-id-value={helperId} className={`absolute ${test[helperId]} bg-red-800 w-1 h-1`} />

            <div className="flex flex-column justify-center items-center border-1 border-dashed h-full rounded-xl p-10">
                <div className="max-w-125">
                    <h2 ref={titleRef} className={`${backgroundColor ? 'text-accent' : ''}`}>{title}</h2>
                    <p className={`${backgroundColor ? 'text-accent' : ''}`}>{description}</p>

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
            </div>

            {
                backgroundColor &&
                <div
                    ref={filledContainedRed}
                    className={`absolute left-[-50%] bottom-[-50%] h-full w-0 ${backgroundColor} rounded-[150%] z-[-1]`}
                />
            }
        </section>
    )
}