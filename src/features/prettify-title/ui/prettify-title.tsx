import { ComponentPropsWithoutRef, memo, RefObject, useEffect, useRef } from "react";
import { gsap } from 'gsap';
import SplitText from 'gsap/SplitText';

type Heading = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type Props<Tag extends Heading> = {
    as?: Tag;
    containerRef: RefObject<HTMLElement | null>;
} & Omit<ComponentPropsWithoutRef<Tag>, "as">;

function PrettifyTitle<Tag extends Heading = "h2">({
    as,
    containerRef,
    ...props
}: Props<Tag>) {
    const Title = as || 'h2';
    const ref = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        if (!containerRef.current || !ref.current) return;
        const split = SplitText.create(ref.current, {
            type: "chars, words",
            charsClass: "inline-block"
        });

        const anim = gsap.from(split.chars, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom-=85%",
                end: "top center",
                toggleActions: "play none none reverse",
            },
            opacity: 0,
            scale: 0.5,
            y: 15,
            rotation: 'random(-15, 15)',
            transformOrigin: "center bottom",
            duration: 0.5,
            stagger: 0.02,
            ease: "elastic.out(1, 0.6)",
            clearProps: "all",
        });

        return () => {
            anim.scrollTrigger?.kill();
            anim.kill();
            split.revert();
        };
    }, [containerRef]);

    return <Title {...props} ref={ref}>{props.children}</Title>;
}

export default memo(PrettifyTitle)