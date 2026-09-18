import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

interface Props {
  tl: gsap.core.Timeline | null;
}

export default function Circles({ tl }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!tl || !containerRef.current) return;

    const circles = containerRef.current.children;
    const anim = gsap.fromTo(
      circles,
      {
        scale: 0.6,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: (_, target) => Number(target.getAttribute("data-opacity")),
        duration: 2.5,
        ease: "power3.out",
        stagger: 0.15,
      },
    );

    tl.add(anim, 0)
  }, [tl]);

  return (
    <div ref={containerRef} className="w-[50%] absolute top-[110%] left-[60%] md:top-full md:left-[70%] lg:top-[90%] lg:left-[70%] xl:relative xl:top-0 xl:left-0">
      {Array(3)
        .fill(0)
        .map((_, index) => {
          const targetOpacity = 0.04 - index * 0.015;
          return (
            <span
              key={`circle-on-product-${index}`}
              data-opacity={targetOpacity}
              className="rounded-full bg-[#E00655] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                width: 450 + 125 * index,
                height: 450 + 125 * index,
                opacity: 0, 
              }}
            />
          );
        })}
    </div>
  );
}
