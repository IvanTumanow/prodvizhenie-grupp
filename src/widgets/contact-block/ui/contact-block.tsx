import { Field, FieldLabel } from "@/shadcn/components/ui/field";

import { Button } from "@/src/entities/button/ui";
import { Input } from "@/src/entities/input/ui";
import { LinkContact } from "@/src/entities/link-contact";
import { PrettifyText } from "@/src/features/prettify-text";
import { PrettifyTitle } from "@/src/features/prettify-title";
import { useRevealTimeline } from "@/src/features/timeline";
import { ROUTES } from "@/src/shared/config";
import { SectionContent, SectionContentProps } from '@/src/widgets/section-content';
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Props extends SectionContentProps {
    title: string
    description: string
}

const phoneRegex = /^(7|8)[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;

const formSchema = z.object({
    fullName: z.string().min(3, 'Минимальная длина 3'),
    phoneOrEmail: z.string()
        .trim()
        .refine(
            (value) => {
                const isEmail = z.email().safeParse(value).success;
                const isPhone = phoneRegex.test(value);
                return isEmail || isPhone;
            },
            {
                message: "Введите корректный email или российский номер телефона",
            }
        ),
    consentIsAccess: z.boolean().refine((val) => val === true, {
        message: "Необходимо согласиться с политикой конфиденциальности",
    }),
});

type IForm = z.infer<typeof formSchema>

export default function ContactBlock({ title, description, ...props }: Props) {
    const containerRef = useRef<HTMLElement>(null)
    const tl = useRevealTimeline(containerRef)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<IForm>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: IForm) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        reset()
    };

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
                    <div className="flex flex-col gap-5 sm:gap-12.5">
                        <div className="flex flex-col gap-1 sm:gap-12.5">
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

                        <div className="flex flex-col gap-5 lg:flex-row lg:gap-12.5">
                            <LinkContact typeContact="phone" value="+7 (921) 232 52 11" tl={tl} />
                            <LinkContact typeContact="mail" value="tanydem04@gmail.com" tl={tl} />
                        </div>
                    </div>

                    <div className="flex flex-col gap-5 sm:gap-12.5">
                        <div className="flex flex-col gap-1 sm:gap-12.5">
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