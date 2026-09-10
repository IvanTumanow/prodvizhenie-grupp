'use client'

import { BLOCKS_INFO } from "@/src/shared/configs/app-info.config";
import Block1 from "@/src/widgets/example-blocks/ui/block1";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from 'next/image';

import bottlePath from '@/src/widgets/example-blocks/ui/bottle.png'
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const blocks = BLOCKS_INFO.data

  const bottleRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const bottle = bottleRef.current;

    if (!container || !bottle) return;

    // Находим все точки и сортируем их по индексу
    const points = Array.from(container.querySelectorAll('span[data-id-value]')) as HTMLElement[];
    points.sort((a, b) => Number(a.dataset.idValue) - Number(b.dataset.idValue));

    if (points.length < 2) return;

    const ctx = gsap.context(() => {
      // Функция расчета координат бутылочки относительно контейнера для конкретной точки
      const getPointCoords = (point: HTMLElement) => {
        const containerRect = container.getBoundingClientRect();
        const pointRect = point.getBoundingClientRect();
        return {
          x: pointRect.left - containerRect.left + (point.offsetWidth / 2) - (bottle.offsetWidth / 2),
          y: pointRect.top - containerRect.top + (point.offsetHeight / 2) - (bottle.offsetHeight / 2),
        };
      };

      // 1. Устанавливаем бутылочку в стартовую позицию (точка 0)
      const startCoords = getPointCoords(points[0]);
      gsap.set(bottle, { x: startCoords.x, y: startCoords.y });

      // 2. Создаем одну общую таймлайн, привязанную к скроллу всего контейнера
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",      // Начинаем, как только первый блок доходит до верха экрана
          end: "bottom bottom",  // Заканчиваем, когда весь контейнер проскроллен до конца
          scrub: 2,            // Плавное следование за скроллом (число дает приятную инерцию)
        }
      });

      // 3. Последовательно добавляем перемещение к каждой точке в таймлайн
      points.forEach((point, index) => {
        if (index === 0) return; // Стартовую позицию мы уже задали

        const coords = getPointCoords(point);

        const rotate = [0, -10, 10, -10]
        const scale = [1, 0.9, 0.9, 2]

        tl.to(bottle, {
          x: coords.x,
          y: coords.y,
          rotate: rotate[index],
          scale: scale[index],
          ease: "none", // Без ускорений, чтобы движение было линейно привязано к скроллу
        });
      });

      // Пересчитываем позиции при изменении размеров экрана
      const handleResize = () => {
        // Сбрасываем прогресс, обновляем начальную точку и заставляем ScrollTrigger пересчитать размеры
        const initCoords = getPointCoords(points[0]);
        gsap.set(bottle, { x: initCoords.x, y: initCoords.y });
        ScrollTrigger.refresh();
      };

      window.addEventListener('resize', handleResize);

    }, container);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      className="relative main-page overflow-hidden"
      id="main-section"
      ref={containerRef}
    >
      <Image
        src={bottlePath}
        alt="bottle"
        width={284 / 1.3}
        height={853 / 1.3}
        id={'bottle'}
        ref={bottleRef}
        className="absolute pointer-events-none will-change-transform z-1"
        style={{ left: 0, top: 0 }}
      />

      <div>
        <Block1
          title={blocks.HERO_BANNER.title}
          items={blocks.HERO_BANNER.items}
          backgroundColor
          dataId="block"
          helperId={0}
        />

        <Block1
          title={blocks.COMPARE.title}
          description={blocks.COMPARE.description}
          items={blocks.COMPARE.items}
          dataId="block"
          helperId={1}
        />

        <Block1
          title={blocks.ABOUT_PRODUCT.title}
          description={blocks.ABOUT_PRODUCT.description}
          items={blocks.ABOUT_PRODUCT.items}
          dataId="block"
          helperId={2}
        />

        <Block1
          title={blocks.CONTACT.title}
          description={blocks.CONTACT.description}
          backgroundColor
          dataId="block"
          helperId={3}
        />
      </div>
    </div>
  );
}
