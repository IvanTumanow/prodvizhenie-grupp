import { Field, FieldLabel } from "@/shadcn/components/ui/field";

import { Button } from "@/src/entities/button/ui";
import { Input } from "@/src/entities/input/ui";
import { PrettifyText } from "@/src/features/prettify-text";
import { useRevealTimeline } from "@/src/features/timeline";
import { ROUTES } from "@/src/shared/config";
import { SectionContent, SectionContentProps } from '@/src/widgets/section-content';
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { ContactItemsBlock, SubmitTitle } from ".";
import { formSchema, IForm } from "../model";

interface Props extends SectionContentProps {
    title: string
    description: string
}

export default function ContactBlock({ title, description, ...props }: Props) {
    const containerRef = useRef<HTMLElement>(null)
    const tl = useRevealTimeline(containerRef)

    const { register, handleSubmit, reset, formState: { errors, isSubmitting }, } = useForm<IForm>({ resolver: zodResolver(formSchema) });

    const onSubmit = async (data: IForm) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        reset()
    };
    // TODO: add submit data to backend
    return (
        <>
            <SectionContent
                {...props}
                helperClassName={`absolute top-[80%] left-[90%] sm:top-[110%] sm:left-[95%] xl:top-[60%] xl:left-[85%] -translate-x-1/2 -translate-y-1/2`}
                dataValueId={props.dataValueId}
                backgroundColorClassName={props.backgroundColorClassName}
                ref={containerRef}
                id={ROUTES.CONTACTS.slug.replace('#', '').trim()}
            >
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="h-full w-full z-10 relative flex flex-col gap-5 md:gap-20 lg:gap-40"
                >
                    <ContactItemsBlock title={title} description={description} tl={tl} backgroundColorClassName={props.backgroundColorClassName} />

                    <div className="flex flex-col gap-5 sm:gap-12.5">
                        <SubmitTitle tl={tl} backgroundColorClassName={props.backgroundColorClassName} />

                        <div className="flex w-fit flex-col gap-5 lg:flex-row lg:gap-8">
                            <Field orientation="horizontal" className="flex flex-col gap-2 items-start">
                                <Input
                                    tl={tl}
                                    {...register('fullName')}
                                    placeholder="Как вас зовут? ФИО"
                                />
                                {errors.fullName && <p className="text-destructive text-nowrap">{errors.fullName.message}</p>}
                            </Field>

                            <Field orientation="horizontal" className="flex flex-col gap-2 items-start">
                                <Input
                                    tl={tl}
                                    {...register('phoneOrEmail')}
                                    placeholder="Ваша почта или телефон"
                                />

                                {errors.phoneOrEmail && <p className="text-destructive text-nowrap">{errors.phoneOrEmail.message}</p>}
                            </Field>
                        </div>

                        <div className="flex flex-col gap-2.5 w-1/2 lg:w-full">
                            <div>
                                <Field orientation="horizontal" >
                                    <input type={'checkbox'} {...register('consentIsAccess')} />
                                    <FieldLabel
                                        htmlFor="checkout-7j9-same-as-shipping-wgm"
                                        className="font-normal"
                                    >
                                        <PrettifyText tl={tl} className={errors?.consentIsAccess ? 'text-destructive' : 'text-accent'}>
                                            Я ознакомлен(а) с Политикой конфиденциальности и даю согласие на обработку моих персональных данных
                                        </PrettifyText>
                                    </FieldLabel>
                                </Field>
                            </div>

                            <Button
                                tl={tl}
                                type='submit'
                            >
                                {isSubmitting ? 'Отправка...' : 'Оставить заявку'}
                            </Button>
                        </div>
                    </div>
                </form>
            </SectionContent>
        </>
    )
}