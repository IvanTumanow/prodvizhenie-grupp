import { ComponentPropsWithRef } from "react";

export interface SectionContentProps extends ComponentPropsWithRef<'section'> {
    dataValueId?: number
    helperClassName?: string
    backgroundColorClassName?: string
}