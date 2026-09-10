import { ComponentPropsWithoutRef, RefObject, useEffect, useRef } from "react";
import { gsap } from 'gsap'
import SplitText from 'gsap/SplitText';

interface Props extends ComponentPropsWithoutRef<'p'> {
    containerRef: RefObject<HTMLElement | null>
}

export default function PrettifyText({ containerRef, ...props }: Props) {
    const ref = useRef(null)

    useEffect(() => {
        if (!containerRef.current || !ref.current) return;

        const split = SplitText.create(ref.current, {
            type: "words",
            // autoSplit: true,
            mask: "words",
        });

        const anim = gsap.from(split.words, {
            // x: "100",
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

    return (
        <p
            {...props}
            ref={ref}
        >
            {props.children}
        </p>
    )
}