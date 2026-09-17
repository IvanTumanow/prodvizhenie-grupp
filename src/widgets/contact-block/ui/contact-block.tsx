import { Checkbox } from "@/shadcn/components/ui/checkbox";
import { Field, FieldLabel } from "@/shadcn/components/ui/field";

import { Button } from "@/src/entities/button/ui";
import { Input } from "@/src/entities/input/ui";
import { LinkContact } from "@/src/entities/link-contact";
import { PrettifyText } from "@/src/features/prettify-text";
import { PrettifyTitle } from "@/src/features/prettify-title";
import { useRevealTimeline } from "@/src/features/timeline";
import { SectionContent, SectionContentProps } from '@/src/widgets/section-content';
import { useRef } from "react";

interface Props extends SectionContentProps {
    title: string
    description: string
}

export default function ContactBlock({ title, description, ...props }: Props) {
    const containerRef = useRef<HTMLElement>(null)
    const tl = useRevealTimeline(containerRef)

    return (
        <>
            <SectionContent
                {...props}
                helperClassName={`absolute left-[80%] top-[50%] -translate-x-1/2 -translate-y-1/2`}
                dataValueId={props.dataValueId}
                backgroundColorClassName={props.backgroundColorClassName}
                ref={containerRef}
            >
                <form className="h-full w-full z-10 relative flex flex-col gap-40">
                    <div className="flex flex-col gap-12.5">
                        <div className="flex flex-col gap-2.5">
                            <PrettifyTitle
                                className={`${props.backgroundColorClassName ? 'text-accent' : ''}`}
                                tl={tl}
                            >
                                {title}
                            </PrettifyTitle>

                            <PrettifyText
                                className={`${props.backgroundColorClassName ? 'text-accent' : ''}`}
                                tl={tl}
                            >
                                {description}
                            </PrettifyText>
                        </div>

                        <div className="flex flex-row gap-12.5">
                            <LinkContact typeContact="phone" value="+7 (921) 232 52 11" tl={tl} />
                            <LinkContact typeContact="mail" value="tanydem04@gmail.com" tl={tl} />
                        </div>
                    </div>

                    <div className="flex flex-col gap-12.5">
                        <div className="flex flex-col gap-2.5">
                            <PrettifyTitle
                                className={`${props.backgroundColorClassName ? 'text-accent' : ''}`}
                                tl={tl}
                                as={'h2'}
                            >
                                Оставьте заявку
                            </PrettifyTitle>

                            <PrettifyText
                                className={`${props.backgroundColorClassName ? 'text-accent' : ''}`}
                                tl={tl}
                            >
                                Тогда мы сами вам позвоним или напишем!
                            </PrettifyText>
                        </div>

                        <div className="flex flex-row gap-8 w-fit">
                            <Field orientation="horizontal">
                                <Input
                                    tl={tl}
                                    placeholder="Как вас зовут? ФИО"
                                />
                            </Field>

                            <Field orientation="horizontal">
                                <Input
                                    tl={tl}
                                    placeholder="Ваша почта или телефон"
                                />
                            </Field>
                        </div>

                        <div className="flex flex-col gap-2.5">
                            <Field orientation="horizontal">
                                <Checkbox
                                    id="checkout-7j9-same-as-shipping-wgm"
                                    className={'dark'}
                                />
                                <FieldLabel
                                    htmlFor="checkout-7j9-same-as-shipping-wgm"
                                    className="font-normal"
                                >
                                    <PrettifyText tl={tl}>
                                        Я ознакомлен(а) с Политикой конфиденциальности и даю согласие на обработку моих персональных данных
                                    </PrettifyText>
                                </FieldLabel>
                            </Field>

                            <Button
                                tl={tl}
                                type='submit'
                            >
                                Оставить заявку
                            </Button>
                        </div>
                    </div>
                </form>
            </SectionContent>
        </>
    )
}