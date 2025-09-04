// components/SmoothScroller.js
"use client"; // This is a client component

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

export default function SmoothScroller() {
  useEffect(() => {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
    };
  }, []);

  return null; // This component does not render anything
}