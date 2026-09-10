import { ComponentPropsWithoutRef, RefObject, useEffect, useRef } from "react";
import { gsap } from 'gsap';
import SplitText from 'gsap/SplitText';

interface Props extends ComponentPropsWithoutRef<'p'> {
    containerRef: RefObject<HTMLElement | null>;
}

export default function PrettifyText({ containerRef, ...props }: Props) {
    const ref = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (!containerRef.current || !ref.current) return;
        const split = SplitText.create(ref.current, {
            type: "lines,words",
            wordsClass: "inline-block"
        });

        const anim = gsap.from(split.words, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom-=70%",
                end: "top center",
                toggleActions: "play none none reverse",
            },
            opacity: 0,
            y: 20, 
            rotation: () => gsap.utils.random(-4, 4),
            duration: 0.6,
            delay: props.className ? 0.4 : 0.2,
            stagger: {
                each: 0.03,
                from: "start",
            },
            ease: "back.out(1.2)", 
            
            clearProps: "all",
        });

        return () => {
            anim.scrollTrigger?.kill();
            anim.kill();
            split.revert();
        };
    }, [containerRef, props.className]);

    return (
        <p
            {...props}
            ref={ref}
        >
            {props.children}
        </p>
    );
}
