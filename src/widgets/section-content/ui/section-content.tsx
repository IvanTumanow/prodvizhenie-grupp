import { useRef } from "react";
import { SectionContentProps } from "../model";
import { cn } from "cn";
import { useFilledBG } from "../model/use-filled.hooks";

export default function SectionContent({ dataValueId, helperClassName, backgroundColorClassName, ref, ...props }: SectionContentProps) {
    const filledContainer = useRef<HTMLDivElement>(null);

    useFilledBG<HTMLDivElement>(filledContainer)

    return (
        <section
            ref={ref}

            className={
                cn('bg-accent',
                    'w-full h-screen p-10 shadow-2xl relative overflow-hidden',
                    props?.className)
            }

            {...props}
        >
            {
                typeof dataValueId === 'number' &&
                <span data-id-value={dataValueId} className={`absolute bg-red-800 w-1 h-1 ${helperClassName}`} />
            }

            <div className="flex flex-column justify-center items-center border border-dashed h-full rounded-xl p-10">
                {props.children}
            </div>

            {
                backgroundColorClassName &&
                <div
                    ref={filledContainer}
                    className={`absolute left-[-50%] bottom-[-50%] h-full w-0 ${backgroundColorClassName} rounded-[150%] -z-1`}
                />
            }
        </section>
    )
}