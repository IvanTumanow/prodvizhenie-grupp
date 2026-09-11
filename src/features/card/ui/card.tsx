import { Card, CardDescription, CardHeader, CardTitle } from "@/shadcn/components/ui/card";
import { PrettifyText } from "@/src/features/prettify-text";
import { PrettifyTitle } from "@/src/features/prettify-title";
import { ComponentPropsWithoutRef, useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "cn";

interface Props extends ComponentPropsWithoutRef<'div'> {
  title: string;
  description: string;
  tl: gsap.core.Timeline | null
}

export default function CardCompare({ title, description, tl, ...props }: Props) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!cardRef.current || !tl) return;

    const anim = gsap.fromTo(
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
      }
    );

    tl.add(anim, 0)
  }, [tl]);

  return (
    <Card className={cn("w-full pt-6 origin-bottom", props.className)} ref={cardRef} {...props}>
      <CardHeader>
        <CardTitle>
          <PrettifyTitle tl={tl} className="text-[#E00655]">
            {title}
          </PrettifyTitle>
        </CardTitle>
        <CardDescription>
          <PrettifyText tl={tl} className="text-foreground">
            {description}
          </PrettifyText>
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
