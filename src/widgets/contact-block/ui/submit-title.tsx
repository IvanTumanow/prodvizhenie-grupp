import { PrettifyText } from "@/src/features/prettify-text";
import { PrettifyTitle } from "@/src/features/prettify-title";
import { SectionContentProps } from "@/src/widgets/section-content";

interface Props extends Pick<SectionContentProps, 'backgroundColorClassName'> {
    tl: gsap.core.Timeline | null
}

export default function SubmitTitle({tl, backgroundColorClassName}: Props) {
    return (
        <>
            <div className="flex flex-col gap-1 sm:gap-12.5">
                <PrettifyTitle
                    className={`${backgroundColorClassName ? 'text-accent' : ''}`}
                    tl={tl}
                    as={'h2'}
                >
                    Оставьте заявку
                </PrettifyTitle>

                <PrettifyText
                    className={`${backgroundColorClassName ? 'text-accent' : ''}`}
                    tl={tl}
                >
                    Тогда мы сами вам позвоним или напишем!
                </PrettifyText>
            </div>
        </>
    )
}