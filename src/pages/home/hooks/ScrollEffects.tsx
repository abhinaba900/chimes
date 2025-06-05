"use client";

import { useEffect, useRef, ReactNode, Children } from "react";

interface ScaleDownScrollProps {
  children: ReactNode;
}

declare global {
  interface Window {
    $: any;
    jQuery: any;
    Velocity: any;
  }
}

const ScaleDownScroll = ({ children }: ScaleDownScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animatingRef = useRef(false);

  useEffect(() => {
    // ✅ Only run on client
    const setupVelocity = async () => {
      if (typeof window === "undefined") return;

      const $ = (await import("jquery")).default;
      const Velocity = (await import("velocity-animate")).default;
      await import("velocity-animate/velocity.ui");

      window.$ = $;
      window.jQuery = $;
      window.Velocity = Velocity;

      if (!window.$ || !window.Velocity?.RegisterEffect) {
        console.error("Velocity.js UI Pack is not loaded properly.");
        return;
      }

      const scrollAnimation = () => {
        if (animatingRef.current) return;

        const scrollTop = $(window).scrollTop() || 0;
        const windowHeight = $(window).height() || 0;

        $(".cd-section").each(function () {
          const section = $(this);
          const content = section.find(".cd-section-content");
          const offset = scrollTop - (section.offset()?.top || 0);
          const [translateY, scale, opacity, boxShadowBlur] =
            setSectionAnimation(offset, windowHeight);

          transformSection(content, translateY, scale, opacity, boxShadowBlur);

          offset >= 0 && offset < windowHeight
            ? section.addClass("visible")
            : section.removeClass("visible");
        });
      };

      const setSectionAnimation = (
        sectionOffset: number,
        windowHeight: number
      ): [number, number, number, number] => {
        let scale = 1,
          translateY = 100,
          opacity = 1,
          boxShadowBlur = 0;

        if (sectionOffset >= -windowHeight && sectionOffset <= 0) {
          translateY = (-sectionOffset * 100) / windowHeight;
        } else if (sectionOffset > 0 && sectionOffset <= windowHeight) {
          translateY = (-sectionOffset * 100) / windowHeight;
          scale = parseFloat(
            (1 - (sectionOffset * 0.3) / windowHeight).toFixed(5)
          );
          opacity = parseFloat((1 - sectionOffset / windowHeight).toFixed(5));
          boxShadowBlur = 40 * (sectionOffset / windowHeight);
        } else if (sectionOffset < -windowHeight) {
          translateY = 100;
        } else {
          translateY = -100;
          scale = 0.7;
          opacity = 0;
          boxShadowBlur = 40;
        }

        return [translateY, scale, opacity, boxShadowBlur];
      };

      const transformSection = (
        element: JQuery,
        translateY: number,
        scale: number,
        opacity: number,
        boxShadowBlur: number
      ) => {
        const windowHeight = window.innerHeight;
        const translateYPx = (translateY / 1000) * windowHeight;

        Velocity(
          element,
          {
            translateY: `${translateYPx}px`,
            scale,
            opacity,
            boxShadowBlur: `${boxShadowBlur}px`,
          },
          {
            duration: 0,
            queue: false,
          }
        );
      };

      const prevSection = (event?: JQuery.Event) => {
        event?.preventDefault();
        const visibleSection = $(".cd-section.visible");

        if (!animatingRef.current && !visibleSection.is(":first-child")) {
          animatingRef.current = true;
          const prevSection = visibleSection.prev(".cd-section");

          visibleSection.removeClass("visible");
          visibleSection.velocity("scaleDown", {
            duration: 800,
            easing: "easeInCubic",
            complete: () => (animatingRef.current = false),
          });

          prevSection.addClass("visible").velocity("translateNone", {
            duration: 800,
            easing: "easeInCubic",
          });
        }
      };

      const nextSection = (event?: JQuery.Event) => {
        event?.preventDefault();
        const visibleSection = $(".cd-section.visible");

        if (!animatingRef.current && !visibleSection.is(":last-of-type")) {
          animatingRef.current = true;
          const nextSection = visibleSection.next(".cd-section");

          visibleSection.removeClass("visible");
          visibleSection.velocity("translateUp", {
            duration: 800,
            easing: "easeInCubic",
            complete: () => (animatingRef.current = false),
          });

          nextSection.addClass("visible").velocity("translateNone", {
            duration: 800,
            easing: "easeInCubic",
          });
        }
      };

      const checkNavigation = () => {
        const visibleSection = $(".cd-section.visible");
        const prevArrow = $(".cd-prev");
        const nextArrow = $(".cd-next");

        visibleSection.is(":first-of-type")
          ? prevArrow.addClass("inactive")
          : prevArrow.removeClass("inactive");

        visibleSection.is(":last-of-type")
          ? nextArrow.addClass("inactive")
          : nextArrow.removeClass("inactive");
      };

      // Register custom effects
      Velocity.RegisterEffect("translateUp", {
        defaultDuration: 1,
        calls: [[{ translateY: "-100%" }, 1]],
      });

      Velocity.RegisterEffect("translateNone", {
        defaultDuration: 1,
        calls: [
          [
            { translateY: "0", opacity: "1", scale: "1", boxShadowBlur: "0" },
            1,
          ],
        ],
      });

      Velocity.RegisterEffect("scaleDown", {
        defaultDuration: 1,
        calls: [[{ opacity: "0", scale: "0.7", boxShadowBlur: "40px" }, 1]],
      });

      $(window).on("scroll", scrollAnimation);
      $(document).on("keydown", function (event) {
        if (event.which === 40 && !$(".cd-next").hasClass("inactive"))
          nextSection(event);
        else if (event.which === 38 && !$(".cd-prev").hasClass("inactive"))
          prevSection(event);
      });

      scrollAnimation();
      checkNavigation();

      return () => {
        $(window).off("scroll", scrollAnimation);
        $(document).off("keydown");
      };
    };

    setupVelocity();
  }, []);

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      {Children.map(children, (child, index) => (
        <section
          key={index}
          className="cd-section"
          style={{
            position: "relative",
            width: "100%",
            overflow: "hidden",
            margin: 0,
            padding: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            className="cd-section-content"
            style={{
              width: "100%",
              willChange: "transform, opacity, filter",
              transformOrigin: "center center",
            }}
          >
            {child}
          </div>
        </section>
      ))}
    </div>
  );
};

export default ScaleDownScroll;
