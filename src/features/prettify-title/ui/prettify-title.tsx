import { ComponentPropsWithoutRef, RefObject, useEffect, useRef } from "react";
import { gsap } from 'gsap'
import SplitText from 'gsap/SplitText';

type Heading = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type Props<Tag extends Heading> = {
    as?: Tag;
    containerRef: RefObject<HTMLElement | null>
} & Omit<ComponentPropsWithoutRef<Tag>, "as">;

export default function PrettifyTitle<Tag extends Heading = "h2">({ as, containerRef, ...props }: Props<Tag>) {
    const Title = as || 'h2'

    const ref = useRef(null)

    useEffect(() => {
        if (!containerRef.current || !ref.current) return;

        const split = SplitText.create(ref.current, {
                type: "chars",
                // autoSplit: true,
                mask: "chars",
            });

        const anim = gsap.from(split.chars, {
            x: "-100",
            // y: "-10",
            opacity: 0,
            // duration: 1,
            delay: props.className ? 0.3 : 0,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom-=60%",
                end: "top center",
                toggleActions: "play none restart reverse",
            },
            stagger: 0.01,
        })

        return () => {
            anim.scrollTrigger?.kill()
            anim.kill()
            split.revert()
        }
    }, [ref, containerRef, props.className])

    return <Title  {...props} ref={ref}>{props.children}</Title>
}