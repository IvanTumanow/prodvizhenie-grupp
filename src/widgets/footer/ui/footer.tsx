'use client'

import { LogoFund } from "@/src/entities/fund-logo";
import { SectionContent, SectionContentProps } from "../../section-content";
import { useRef } from "react";
import Link from "next/link";
import FooterTab from "./footer-tab";
import { ROUTES } from "@/src/shared/config";

export default function Footer({ ...props }: SectionContentProps) {
    const containerRef = useRef<HTMLElement>(null)

    const tabApp = {
        title: 'Разделы сайта',
        routes: [ROUTES.HOME, ROUTES.USE, ROUTES.ABOUT_PRODUCT, ROUTES.CONTACTS, ROUTES.ABOUT_FUND]
    }

    const tabDocuments = {
        title: 'Документы',
        routes: [ROUTES.PRIVACY_POLICY, ROUTES.PERSONAL_DATA_CONSENT]
    }

    const tabCompany = {
        title: 'О компании',
        routes: [
            { name: 'ООО "ПРОДВИЖЕНИЕ-ГРУПП"160555, Вологодская область, г. Вологда, с. Молочное, ул. Парковая, д. 7а', slug: ROUTES.HOME.slug },
            { name: '+7 (921) 232 52 11', slug: 'tel:79212325211' },
            { name: 'tanydem04@gmail.com', slug: 'mailto:tanydem04@gmail.com' },
        ]
    }

    return (
        <footer>
            <SectionContent
                {...props}
                backgroundColorClassName={props.backgroundColorClassName}
                ref={containerRef}
                className="h-fit py-12.5"
            >
                <div className="flex flex-col gap-3 sm:gap-12.5">
                    <div className="flex flex-col sm:flex-row gap-5 lg:gap-20 xl:gap-50">
                        <FooterTab {...tabApp} />
                        <FooterTab {...tabDocuments} />
                        <FooterTab {...tabCompany} />
                    </div>

                    <span className="block bg-white opacity-10 h-px w-full"/>

                    <p className="text-muted-foreground text-xs sm:text-base">
                        Все изображения на сайте носят информационный (иллюстративный) характер и не являются офертой. Тип и форма упаковки для розлива готового продукта определяются Заказчиком самостоятельно на этапе внедрения технологии. Предоставляемая технология производства не привязана к конкретному виду упаковки. Итоговый выбор тары (стекло, ПЭТ, мягкий пакет или бочка) остается за Заказчиком и определяется исключительно маркетинговой стратегией и производственными мощностями Заказчика
                    </p>

                    <div className="flex flex-row gap-3 sm:gap-12.5 justify-start items-start">
                        <Link href="https://fasie.ru/" target="blank" className="">
                            <LogoFund className="h-12.5 w-25" />
                        </Link>

                        <p className="text-muted-foreground text-xs sm:text-base">
                            Проект реализован при поддержке Фонда содействия инновациям в рамках программы “Студенческий стартап” мероприятия «Платформа университетского технологического предпринимательства» федерального проекта “Технологии”
                        </p>
                    </div>

                    <p className="text-muted-foreground text-xs sm:text-base">ООО &quot;ПРОДВИЖЕНИЕ-ГРУПП&quot;. Все права защищены.</p>
                </div>
            </SectionContent>
        </footer>
    )
}