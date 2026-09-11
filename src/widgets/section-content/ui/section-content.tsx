import { useRef } from "react";
import { SectionContentProps } from "../model";
import { cn } from "cn";
import { useFilledBG } from "../model/use-filled.hooks";
import { useScrollAway } from "../../scroll-away";

export default function SectionContent({ dataValueId, helperClassName, backgroundColorClassName, ref, ...props }: SectionContentProps) {
    const filledContainer = useRef<HTMLDivElement>(null);

    useFilledBG<HTMLDivElement>(filledContainer)
    useScrollAway(ref!)

    return (
        <section
            ref={ref}

            className={
                cn('bg-(--color-background)',
                    'w-full h-screen p-10 shadow-2xl relative overflow-hidden will-change-transform',
                    props?.className)
            }

            {...props}
        >
            {
                typeof dataValueId === 'number' &&
                <span data-id-value={dataValueId} className={`absolute bg-red-800 w-1 h-1 ${helperClassName}`} />
            }

            <div className="flex flex-column justify-center items-center h-full rounded-xl">
                {props.children}
            </div>

            {
                backgroundColorClassName &&
                <div
                    ref={filledContainer}
                    className={`absolute left-[-50%] bottom-[-50%] h-full w-full scale-0 ${backgroundColorClassName} rounded-[150%] -z-1 transform-will-change`}
                />
            }
        </section>
    )
}