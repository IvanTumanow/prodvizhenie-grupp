import { ComponentPropsWithoutRef } from "react";
import { Button as ShadcnButton } from '@/shadcn/components/ui/button'
import { EntitiesWrapper } from "@/src/entities/entities-wrapper"

interface Props extends ComponentPropsWithoutRef<'button'> {
    tl?: gsap.core.Timeline | null
}

export default function Button(props: Props) {
    return (
        <EntitiesWrapper tl={props?.tl}>
            <ShadcnButton
                {...props}
                variant={'ghost'}
                className={'w-fit inline-flex m-0 hover:bg-transparent hover:text-accent'}
            >
                {props?.children}
            </ShadcnButton>
        </EntitiesWrapper>


    )
}