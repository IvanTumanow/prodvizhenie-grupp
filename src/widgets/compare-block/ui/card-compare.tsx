import { Card, CardDescription, CardHeader, CardTitle } from "@/shadcn/components/ui/card";
import { PrettifyText } from "@/src/features/prettify-text";
import { PrettifyTitle } from "@/src/features/prettify-title";
import { RefObject, useRef } from "react";
import { useGSAP } from "@gsap/react"; // Рекомендуемый хук для React от GSAP
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Регистрируем плагин во избежание дублирования в React
gsap.registerPlugin(ScrollTrigger);

interface Props {
  title: string;
  description: string;
  containerRef: RefObject<HTMLElement | null>;
}

export default function CardCompare({ title, description, containerRef }: Props) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      {
        opacity: 0,
        y: 50,
        scale: 0.85, 
        rotationZ: -3,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationZ: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.6)", 
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, { scope: cardRef });

  return (
    <Card className="w-full max-w-62.5 pt-6 origin-bottom" ref={cardRef}>
      <CardHeader>
        <CardTitle>
          <PrettifyTitle containerRef={containerRef} className="text-[#E00655]">
            {title}
          </PrettifyTitle>
        </CardTitle>
        <CardDescription>
          <PrettifyText containerRef={containerRef} className="text-foreground">
            {description}
          </PrettifyText>
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
