import { useRevealTimeline } from "@/src/features/timeline";
import { useRef } from "react";
import { SectionContent, SectionContentProps } from "@/src/widgets/section-content";
import { PrettifyText } from "@/src/features/prettify-text";
import { LogoFund } from "..";

export default function AboutFundBlock({ ...props }: SectionContentProps) {
    const containerRef = useRef<HTMLElement>(null)
    const tl = useRevealTimeline(containerRef)

    return (
        <SectionContent
            {...props}
            backgroundColorClassName={props.backgroundColorClassName}
            ref={containerRef}
        >

            <div className="flex flex-col items-center justify-around w-full h-full z-10 relative">
                <LogoFund tl={tl}/>

                <PrettifyText
                    className={'text-center'}
                    tl={tl}
                >
                    Проект реализован при поддержке Фонда содействия инновациям в рамках программы “Студенческий стартап” мероприятия «Платформа университетского технологического предпринимательства» федерального проекта “Технологии”
                </PrettifyText>
            </div>
        </SectionContent>
    )
}