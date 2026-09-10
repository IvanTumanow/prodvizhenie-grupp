"use client";

import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from 'gsap/SplitText';

import { ReactNode, useLayoutEffect } from "react";

export default function GSAP_RemotePluginsProviders({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);
  }, []);

  return (
    <>
      {children}
    </>
  );
}
