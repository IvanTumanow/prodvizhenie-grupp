import { ComponentPropsWithoutRef, memo, useEffect, useRef } from "react";
import { gsap } from 'gsap';
import SplitText from 'gsap/SplitText';

interface Props extends ComponentPropsWithoutRef<'p'> {
    tl: gsap.core.Timeline | null
}

function PrettifyText({ tl, ...props }: Props) {
    const ref = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (!ref.current || !tl) return;
        const split = SplitText.create(ref.current, {
            type: "lines,words",
            wordsClass: `inline-block ${props.className ? '' : 'text-[#5E636F]'}`,
            linesClass: 'block'
        });

        const anim = gsap.from(split.words, {
            opacity: 0,
            y: 20,
            rotation: () => gsap.utils.random(-4, 4),
            duration: 0.6,
            stagger: {
                each: 0.03,
                from: "start",
            },
            ease: "back.out(1.2)",
        });

        tl.add(anim, props.className ? 0.4 : 0.2)

        return () => {
            anim.scrollTrigger?.kill();
            anim.kill();
            split.revert();
        };
    }, [tl, props.className]);

    return (
        <p ref={ref} {...props}>
            {
                props.children && typeof props.children === 'string' &&
                props.children.trim().split("\n").map((line, i) =>
                    line.trim() === "" ? (
                        <span key={i} className="block h-4" />
                    ) : (
                        <span key={i} className="block">
                            {line.split(" ").map((w, j) => (
                                <span key={j} data-word className="inline-block mr-[0.25em]">
                                    {w}
                                </span>
                            ))}
                        </span>
                    )
                )
            }
        </p>
    );
}

export default memo(PrettifyText);