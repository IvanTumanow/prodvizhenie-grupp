'use client'


import { useRef } from "react";

import { BLOCKS_INFO } from "@/src/shared/api/app-info.api";

import { HeroBanner } from '@/src/widgets/hero-banner';
import { CompareBlock } from '@/src/widgets/compare-block';
import { AboutProductBlock } from '@/src/widgets/about-product';
import { Bottle } from '@/src/widgets/bottle';
import { AboutFundBlock } from "@/src/widgets/about-fund";
import { ContactBlock } from "@/src/widgets/contact-block";


export default function HomePage() {
    const blocks = BLOCKS_INFO.data

    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div
            className="relative main-page overflow-hidden"
            id="main-section"
        >
            <Bottle containerRef={containerRef} />

            <div ref={containerRef}>
                <HeroBanner
                    {...blocks.HERO_BANNER}
                    backgroundColorClassName={'bg-[#E00655]'}
                    dataValueId={0}
                />

                <CompareBlock
                    {...blocks.COMPARE}
                    dataValueId={1}
                />

                <AboutProductBlock
                    {...blocks.ABOUT_PRODUCT}
                    dataValueId={2}
                />

                <ContactBlock
                    {...blocks.CONTACT}
                    backgroundColorClassName={'bg-accent-foreground'}
                    dataValueId={3}
                />
            </div>

            <AboutFundBlock

            />
        </div>
    );
}