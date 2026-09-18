import { IRoute, RouteKeys } from "../types";

export const ROUTES: Record<RouteKeys, IRoute> = {
    HOME: {
        name: 'Главная',
        slug: '/'
    },
    USE: {
        name: 'Польза',
        slug: '#use'
    },
    ABOUT_PRODUCT: {
        name: 'О продукте',
        slug: '#about-product'
    },
    CONTACTS: {
        name: 'Контакты',
        slug: '#contacts'
    },
    ABOUT_FUND: {
        name: 'О фонде',
        slug: '#about-fund'
    },
    PRIVACY_POLICY: {
        name: 'Политика конфиденциальности',
        slug: '/privacy-policy'
    },
    PERSONAL_DATA_CONSENT: {
        name: 'Согласие на обработку персональных данных',
        slug: '/personal-data-consent'
    },
}