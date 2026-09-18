import { z } from "zod";

const phoneRegex = /^(7|8)[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;

export const formSchema = z.object({
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