import { useEffect, useRef, ReactNode, Children } from 'react';
import $ from 'jquery';
import { gsap } from 'gsap';

interface ScaleDownScrollProps {
  children: ReactNode;
}

const ScaleDownScroll = ({ children }: ScaleDownScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRefs = useRef<gsap.core.Tween[]>([]);

  useEffect(() => {
    const scrollAnimation = () => {
      const scrollTop = $(window).scrollTop() || 0;
      const windowHeight = $(window).height() || 0;
      
      $('.cd-section').each(function(index) {
        const section = $(this);
        const content = section.find('.cd-section-content');
        const offset = scrollTop - (section.offset()?.top || 0);
        const animationValues = setSectionAnimation(offset, windowHeight);
        
        // Kill any existing animations on this element
        animationRefs.current[index]?.kill();
        
        // Create new animation with GSAP
        animationRefs.current[index] = gsap.to(content[0], {
          y: animationValues[0] + 'vh',
          scale: animationValues[1],
          opacity: animationValues[3],
          filter: `blur(${animationValues[4]}px)`,
          duration: 0.8,
          ease: 'power2.out'
        });
        
        (offset >= 0 && offset < windowHeight) 
          ? section.addClass('visible') 
          : section.removeClass('visible');
      });
    };

    const setSectionAnimation = (sectionOffset: number, windowHeight: number): [number, number, number, number, number] => {
      let scale = 1;
      let translateY = 100;
      let opacity = 1;
      let boxShadowBlur = 0;
      
      if (sectionOffset >= -windowHeight && sectionOffset <= 0) {
        // Section entering viewport
        translateY = (-sectionOffset) * 100 / windowHeight;
        scale = 1;
        opacity = 1;
      } else if (sectionOffset > 0 && sectionOffset <= windowHeight) {
        // Section leaving viewport
        translateY = (-sectionOffset) * 100 / windowHeight;
        scale = parseFloat((1 - (sectionOffset * 0.3 / windowHeight)).toFixed(5));
        opacity = parseFloat((1 - (sectionOffset / windowHeight)).toFixed(5));
        boxShadowBlur = 40 * (sectionOffset / windowHeight);
      } else if (sectionOffset < -windowHeight) {
        // Section not yet visible
        translateY = 100;
        scale = 1;
        opacity = 1;
      } else {
        // Section not visible anymore
        translateY = -100;
        scale = 0;
        opacity = 0.7;
      }
      
      return [translateY, scale, 0, opacity, boxShadowBlur];
    };

    // Set up scroll event with debounce for performance
    let isTicking = false;
    const handleScroll = () => {
      if (!isTicking) {
        window.requestAnimationFrame(() => {
          scrollAnimation();
          isTicking = false;
        });
        isTicking = true;
      }
    };

    $(window).on('scroll', handleScroll);
    scrollAnimation(); // Initial call

    return () => {
      $(window).off('scroll', handleScroll);
      // Clean up animations
      animationRefs.current.forEach(anim => anim?.kill());
    };
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      {Children.map(children, (child, index) => (
        <section
          key={index}
          className="cd-section"
          style={{
            position: 'relative',
            height: '100vh',
            width: '100%',
            overflow: 'hidden'
          }}
        >
          <div 
            className="cd-section-content"
            style={{
              width: '100%',
              height: '100%',
              willChange: 'transform, opacity, filter',
              transformOrigin: 'center center'
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