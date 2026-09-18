import { LinkContact } from "@/src/entities/link-contact";
import { PrettifyText } from "@/src/features/prettify-text";
import { PrettifyTitle } from "@/src/features/prettify-title";
import { SectionContentProps } from "@/src/widgets/section-content";

interface Props extends Pick<SectionContentProps, 'backgroundColorClassName'> {
    title: string
    description: string
    tl: gsap.core.Timeline | null
}

export default function ContactItemsBlock({title, description, backgroundColorClassName, tl}: Props) {
    return (
        <>
            <div className="flex flex-col gap-5 sm:gap-12.5">
                <div className="flex flex-col gap-1 sm:gap-12.5">
                    <PrettifyTitle
                        className={`${backgroundColorClassName ? 'text-accent' : ''}`}
                        tl={tl}
                    >
                        {title}
                    </PrettifyTitle>

                    <PrettifyText
                        className={`${backgroundColorClassName ? 'text-accent' : ''}`}
                        tl={tl}
                    >
                        {description}
                    </PrettifyText>
                </div>

                <div className="flex flex-col gap-5 lg:flex-row lg:gap-12.5">
                    <LinkContact typeContact="phone" value="+7 (921) 232 52 11" tl={tl} />
                    <LinkContact typeContact="mail" value="tanydem04@gmail.com" tl={tl} />
                </div>
            </div>
        </>
    )
}