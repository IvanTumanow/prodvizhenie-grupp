'use client'

import { Card, CardDescription, CardHeader, CardTitle } from "@/shadcn/components/ui/card";
import { cn } from "cn";
import { ComponentPropsWithRef, useLayoutEffect, useRef } from "react";
import gsap from 'gsap'

import SplitText from 'gsap/SplitText'

interface Props extends ComponentPropsWithRef<'section'> {
    title: string
    description?: string
    items?: { name: string, description?: string }[]
    backgroundColor?: boolean
    dataId: string
    helperId: number
}

export default function Block1({ title, description, items, backgroundColor, dataId, helperId, ...props }: Props) {
    const titleRef = useRef(null)


    const circleRef = useRef<HTMLDivElement>(null);


    const refContainer = useRef(null)

    useLayoutEffect(() => {
        if (!refContainer.current || !titleRef.current) return;

        const ctx = gsap.context(() => {
            gsap.to(circleRef.current, {
                duration: 1.5,
                ease: "power2.out",
                width: "200%",
                height: '200%',
                scrollTrigger: {
                    trigger: circleRef.current,
                    start: "top bottom",
                    end: "top center",
                    scrub: false,
                }
            });



            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: refContainer.current,
                    start: "bottom bottom",
                    pinSpacing: false,
                    pin: true,
                    scrub: true,
                },
            })

            tl.fromTo
                (
                    refContainer.current,
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
                    trigger: refContainer.current,
                    start: "top bottom-=60%",
                    end: "top center",
                    toggleActions: "play none restart reverse",
                },
                stagger: 0.1,
            })
        }, refContainer);

        return () => ctx.revert();
    }, [title, description, backgroundColor]);


    const test = ['left-[900px] top-[480px]', 'left-[1537px] top-[500px]', 'left-[250px] top-[500px]', 'left-[1400px] top-[1000px]',]

    return (
        <section
            className={
                cn('bg-accent',
                    'w-full h-screen p-10 shadow-2xl relative overflow-hidden',
                    props?.className)
            }

            ref={refContainer}
            {...props}
        >
            <span data-id={dataId} data-id-value={helperId} className={`absolute ${test[helperId]} bg-red-800 w-1 h-1`} />

            <div className="flex flex-column justify-center items-center border-2 border-dashed h-full rounded-xl p-10">
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
                    ref={circleRef}
                    className="absolute left-[-50%] bottom-[-50%] h-full w-0 bg-accent-foreground rounded-[150%] z-[-1]"
                />
            }
        </section>
    )
}