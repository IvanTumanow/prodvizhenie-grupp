import { useEffect, useState } from "react";
import { gsap } from "gsap";

export function useRevealTimeline(
    containerRef: React.RefObject<HTMLElement | null>,
    opts?: { start?: string; end?: string }
) {
    const [tl, setTl] = useState<gsap.core.Timeline | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: opts?.start ?? "top bottom-=70%",
                end: opts?.end ?? "bottom top+=50%",
                toggleActions: "play reverse play reverse",
                invalidateOnRefresh: true,
            },
            defaults: { ease: "back.out(1.2)" },
        });

        setTl(timeline);

        return () => {
            timeline.scrollTrigger?.kill();
            timeline.kill();
            setTl(null);
        };
    }, [containerRef, opts?.start, opts?.end]);

    return tl;
}