import { ComponentPropsWithoutRef, RefObject } from "react";

export interface SectionContentProps extends ComponentPropsWithoutRef<'section'> {
    dataValueId?: number
    helperClassName?: string
    backgroundColorClassName?: string
    ref?: RefObject<HTMLElement| null>
}