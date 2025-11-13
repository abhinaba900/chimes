"use client";
import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";

interface VelocityMapping {
  input: [number, number];
  output: [number, number];
}

interface HorizontalScrollerProps {
  data: unknown[][];
  renderCard: (item: unknown, index: number) => React.ReactNode;
  velocity?: number;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  scrollContainerRef?: React.RefObject<HTMLElement>;
  velocityMapping?: VelocityMapping;
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: React.CSSProperties;
  scrollerStyle?: React.CSSProperties;
  isHoverable?: boolean;
  hoverCardStyle?: React.CSSProperties;
}

function useElementWidth<T extends HTMLElement>(ref: React.RefObject<T | null>) {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    function updateWidth() {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      } else {
        setWidth(0);
      }
    }
    // initial read
    updateWidth();
    // second pass to avoid layout race (fonts/images)
    requestAnimationFrame(updateWidth);
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [ref]);

  return width;
}

const VelocityScroller: React.FC<{
  items: unknown[];
  renderCard: (
    item: unknown,
    index: number,
    isHovered: boolean
  ) => React.ReactNode;
  baseVelocity: number;
  scrollContainerRef?: React.RefObject<HTMLElement>;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: VelocityMapping;
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: React.CSSProperties;
  scrollerStyle?: React.CSSProperties;
  isHoverable?: boolean;
  hoverCardStyle?: React.CSSProperties;
}> = ({
  items,
  renderCard,
  baseVelocity,
  scrollContainerRef,
  damping = 50,
  stiffness = 400,
  numCopies = 6,
  velocityMapping = { input: [0, 1000], output: [0, 5] },
  parallaxClassName,
  scrollerClassName,
  parallaxStyle,
  scrollerStyle,
  isHoverable = true,
}) => {
  const baseX = useMotionValue(0);

  const scrollOptions = scrollContainerRef && scrollContainerRef.current
    ? { container: scrollContainerRef }
    : undefined;

  // If a container ref is provided, useScroll accepts { container: ref }
  // but framer-motion expects the ref object directly under "container".
  // useScroll can accept an object like { container: scrollContainerRef }.
  // We pass the ref object (works in most framer versions)
  const { scrollY } = useScroll(scrollContainerRef ? { container: scrollContainerRef } : {});
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping, stiffness });
  const velocityFactor = useTransform(
    smoothVelocity,
    velocityMapping.input,
    velocityMapping.output,
    { clamp: false }
  );

  const copyRef = useRef<HTMLDivElement | null>(null);
  const copyWidth = useElementWidth(copyRef);

  // track when we have a valid width
  const [measured, setMeasured] = useState(false);

  // hover state
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [shouldStop, setShouldStop] = useState(false);

  // wrap function (numeric)
  const wrap = (min: number, max: number, v: number): number => {
    const range = max - min;
    return ((((v - min) % range) + range) % range) + min;
  };

  // derived x transform (only valid once copyWidth > 0)
  const x = useTransform(baseX, (v) => {
    if (copyWidth <= 0) return "0px";
    return `${wrap(-copyWidth, 0, v)}px`;
  });

  // direction factor based on velocity sign
  const directionFactor = useRef<number>(1);

  // when we first get a valid width, mark measured and reset baseX to a wrapped value
  useEffect(() => {
    if (copyWidth > 0 && !measured) {
      // normalize baseX into the valid range to avoid huge offsets/jumps
      const current = baseX.get();
      const wrapped = wrap(-copyWidth, 0, current);
      baseX.set(wrapped);
      setMeasured(true);
    } else if (copyWidth <= 0 && measured) {
      // lost measurement (unlikely) -> pause animation until remeasured
      setMeasured(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [copyWidth]);

  // animation loop — only runs when we have measurement
  useAnimationFrame((t, delta) => {
    // don't animate until we have a valid width
    if (!measured || copyWidth <= 0) return;

    if (isHoverable && shouldStop) return;

    // base move
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    // update direction based on scroll velocity sign
    directionFactor.current = velocityFactor.get() >= 0 ? 1 : -1;

    // scale moveBy by velocityFactor (smoothVelocity mapped)
    // ensure velocityFactor is finite — fallback to 0
    const vf = Number(velocityFactor.get()) || 0;
    moveBy += directionFactor.current * moveBy * vf;

    // update the baseX
    baseX.set(baseX.get() + moveBy);
  });

  const handleMouseEnter = (index: number) => {
    if (!isHoverable) return;
    setHoveredCard(index);
    setShouldStop(true);
  };

  const handleMouseLeave = () => {
    if (!isHoverable) return;
    setHoveredCard(null);
    setShouldStop(false);
  };

  // build repeated blocks
  const blocks = [];
  for (let i = 0; i < numCopies; i++) {
    blocks.push(
      <div
        key={i}
        ref={i === 0 ? copyRef : null}
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {items.map((item, idx) => (
          <div
            key={`${i}-${idx}`}
            onMouseEnter={() => handleMouseEnter(idx)}
            onMouseLeave={handleMouseLeave}
            style={{
              transition: "all 300ms ease-in-out",
            }}
          >
            {renderCard(item, idx, hoveredCard === idx)}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={parallaxClassName}
      style={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        ...parallaxStyle,
      }}
    >
      <motion.div
        className={scrollerClassName}
        style={{
          display: "flex",
          willChange: "transform",
          ...scrollerStyle,
          x,
        }}
      >
        {blocks}
      </motion.div>
    </div>
  );
};

const HorizontalScroller: React.FC<HorizontalScrollerProps> = ({
  data,
  renderCard,
  velocity = 100,
  damping,
  stiffness,
  numCopies = 6,
  scrollContainerRef,
  velocityMapping,
  parallaxClassName,
  scrollerClassName,
  parallaxStyle,
  scrollerStyle,
  isHoverable = true,
  hoverCardStyle,
}) => {
  // wrappedRenderCard needs to accept the isHovered flag and forward it
  const wrappedRenderCard = (
    item: unknown,
    index: number,
    isHovered: boolean
  ) => {
    // The user's original renderCard didn't have isHovered param.
    // We call the user's renderCard and, if needed, wrap in hover styles.
    const node = renderCard(item, index);

    // If hoverCardStyle was provided, and the user's renderCard returns a React element,
    // we can clone it with extra style on hover. But to keep the API backwards-compatible
    // we will simply return the node (the VelocityScroller already passes isHovered flag).
    // The user can use the isHovered param if they wish (if they update their renderCard signature).
    return typeof node === "object" && node != null ? node : node;
  };

  return (
    <section>
      {data.map((items, index) => (
        <div
          key={index}
          style={{ marginBottom: index !== data.length - 1 ? "20px" : "0" }}
        >
          <VelocityScroller
            items={items}
            // VelocityScroller expects renderCard(item, index, isHovered)
            renderCard={(item: unknown, idx: number, isHovered: boolean) =>
              // If the user-provided renderCard supports only two args, it's still fine —
              // we forward the two-arg call so existing usages don't break.
              // If the user wants hover-aware rendering, they can update their renderCard to accept 3 args.
              (renderCard as unknown as (a: unknown, b: number, c?: boolean) => React.ReactNode)(
                item,
                idx,
                isHovered
              )
            }
            baseVelocity={index % 2 === 0 ? velocity : -velocity}
            scrollContainerRef={scrollContainerRef}
            damping={damping}
            stiffness={stiffness}
            numCopies={numCopies}
            velocityMapping={velocityMapping}
            parallaxClassName={parallaxClassName}
            scrollerClassName={scrollerClassName}
            parallaxStyle={parallaxStyle}
            scrollerStyle={scrollerStyle}
            isHoverable={isHoverable}
            hoverCardStyle={hoverCardStyle}
          />
        </div>
      ))}
    </section>
  );
};

export default HorizontalScroller;
