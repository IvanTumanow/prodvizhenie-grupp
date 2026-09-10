"use client";

import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactNode, useLayoutEffect } from "react";

export default function GSAP_RemotePluginsProviders({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  return (
    <>
      {children}
    </>
  );
}
