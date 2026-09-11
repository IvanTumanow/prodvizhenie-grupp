import { RefObject, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  floatingItems: string[];
  containerRef: RefObject<HTMLElement | null>;
}

export default function FloatingText({ floatingItems, containerRef }: Props) {
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rowRef.current || !containerRef.current) return;

    const scrollTween = gsap.to(rowRef.current, {
      x: -(rowRef.current.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    return () => {
      scrollTween.scrollTrigger?.kill();
      scrollTween.kill();
    };
  }, [floatingItems, containerRef]);

  if (floatingItems.length === 0) return null;

  return (
    <div className="absolute bottom-[10%] left-0 w-full overflow-hidden pointer-events-none">
      <div 
        ref={rowRef} 
        className="flex flex-row gap-8 will-change-transform select-none"
      >
        {floatingItems.map((item, i) => (
          <span
            key={`floating-items-${item}-${i}`}
            className="text-7xl text-nowrap font-semibold text-[#5E636F] opacity-10 uppercase"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
