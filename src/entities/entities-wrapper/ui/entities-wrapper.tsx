import { cn } from "cn";
import { ComponentPropsWithoutRef, useEffect, useRef } from "react";
import { gsap } from "gsap";

interface Props extends ComponentPropsWithoutRef<'div'> {
    tl?: gsap.core.Timeline | null
}

export default function EntitiesWrapper({ tl, ...props }: Props) {
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!wrapperRef.current) return;

        if (tl) {
            const anim = gsap.fromTo(
                wrapperRef.current,
                {
                    scale: 0,
                    opacity: 0,
                },
                {
                    scale: 1,
                    opacity: 1,
                    ease: "back.out(1.7)",
                    duration: 0.6
                },
            );

            tl.add(anim, 0)
        }
    }, [tl]);

    const handleMouseEnter = () => {
        if (!wrapperRef.current) return;

        gsap.killTweensOf(wrapperRef.current);

        gsap.to(wrapperRef.current, {
            scaleX: 1.05,
            scaleY: 0.95,
            duration: 0.15,
            ease: "power1.out",
            onComplete: () => {
                gsap.to(wrapperRef.current, {
                    scaleX: 1,
                    scaleY: 1,
                    duration: 0.6,
                    ease: "elastic.out(1.2, 0.4)"
                });
            }
        });
    };

    const handleMouseLeave = () => {
        if (!wrapperRef.current) return;

        gsap.killTweensOf(wrapperRef.current);

        gsap.to(wrapperRef.current, {
            scaleX: 0.95,
            scaleY: 1.05,
            duration: 0.3,
            ease: "power1.out",
            onComplete: () => {
                gsap.to(wrapperRef.current, {
                    scaleX: 1,
                    scaleY: 1,
                    duration: 0.5,
                    ease: "elastic.out(1, 0.3)"
                });
            }
        });
    };

    return (
        <>
            <div
                {...props}
                ref={wrapperRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={cn(
                    'text-accent font-medium py-1 sm:py-2.5 px-3 sm:px-15 border-2 border-accent rounded-full items-center select-none will-change-transform inline-flex w-fit',
                    props.className
                )}
                style={{ transformOrigin: "center bottom" }}
            >
                {props?.children}
            </div>
        </>
    )
}