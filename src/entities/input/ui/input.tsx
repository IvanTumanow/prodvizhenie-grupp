import { Input as ShadcnInput } from "@/shadcn/components/ui/input";
import { ComponentPropsWithoutRef } from "react";
import { EntitiesWrapper } from "@/src/entities/entities-wrapper"
import { cn } from "cn";

interface Props extends ComponentPropsWithoutRef<'input'> {
    tl?: gsap.core.Timeline | null
}

export default function Input({ tl, ...props }: Props) {
    return (
        <>
            <EntitiesWrapper tl={tl}>
                <ShadcnInput
                    {...props}
                    className={cn(
                    'min-w-80 border-none shadow-none',
                    'focus:border-none focus-visible:border-none',
                    'focus:ring-0 focus-visible:ring-0',
                    'focus-visible:ring-offset-0',
                    props.className
                )}
                />
            </EntitiesWrapper>
        </>
    )
}