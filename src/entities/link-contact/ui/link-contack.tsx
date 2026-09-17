"use client";

import { Mail, Phone } from "lucide-react";
import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";
import { EntitiesWrapper } from "@/src/entities/entities-wrapper"

type LinkType = Omit<ComponentPropsWithoutRef<typeof Link>, 'href'>
type TypeContact = 'phone' | 'mail'

interface Props extends LinkType {
    typeContact: TypeContact
    value: string
    tl?: gsap.core.Timeline | null
}

export default function LinkContact({ typeContact, tl, value, ...props }: Props) {
    const prefix: Record<TypeContact, string> = {
        phone: 'tel:',
        mail: 'mailto:'
    }

    const formattedValue = typeContact === 'phone' ? value.replace(/[^\d+]/g, '') : value

    return (
        <EntitiesWrapper tl={tl}>
            <Link
                {...props}
                href={`${prefix[typeContact]}${formattedValue}`}
                className="flex flex-row gap-5 w-fit items-center"
            >
                {typeContact === 'phone' ? <Phone className="w-4 h-4" /> : <Mail className="w-4 h-4" />}

                <span>
                    {value.toUpperCase()}
                </span>
            </Link>
        </EntitiesWrapper>
    );
}
