import gsap from 'gsap'

interface IGetResponsive {
    buildTimeline: (coef: number) => gsap.core.Timeline
}

export function getResponsivibility({buildTimeline}: IGetResponsive) {
    const mm = gsap.matchMedia();

    mm.add(
        {
            isDesktop: "(min-width: 1201px)",
            isTablet: "(max-width: 1200px) and (min-width: 801px)",
            isSmallTablet: "(max-width: 800px) and (min-width: 501px)",
            isMobile: "(max-width: 500px)",
        },
        (context) => {
            const { isDesktop, isTablet, isSmallTablet, isMobile } = context.conditions as Record<string, boolean>;

            let coef = 1;
            if (isDesktop) coef = 1.2;
            else if (isTablet) coef = 1.2;
            else if (isSmallTablet) coef = 1;
            else if (isMobile) coef = 0.8;

            const tl = buildTimeline(coef);

            return () => {
                tl.scrollTrigger?.kill();
                tl.kill();
            };
        }
    );
}