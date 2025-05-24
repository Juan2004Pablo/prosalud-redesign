
import React, { useState, useEffect, useRef } from 'react';

interface AnimatedNumberProps {
  targetValue: number;
  duration?: number; // Duration in milliseconds
  className?: string;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ targetValue, duration = 1000, className }) => {
  const [currentValue, setCurrentValue] = useState(0);
  const prevValueRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const hasAnimatedRef = useRef(false); // To ensure animation runs only once per targetValue change
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (elementRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasAnimatedRef.current) {
              hasAnimatedRef.current = true;
              animateValue();
            }
          });
        },
        { threshold: 0.1 } // Trigger when 10% of the element is visible
      );
      observerRef.current.observe(elementRef.current);
    }

    return () => {
      if (observerRef.current && elementRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observerRef.current.unobserve(elementRef.current);
      }
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetValue, duration]); // Rerun observer setup if targetValue or duration changes

  const animateValue = () => {
    startTimeRef.current = performance.now();
    prevValueRef.current = 0; // Start from 0 each time it becomes visible and hasn't animated
    
    const step = (timestamp: number) => {
      if (!startTimeRef.current) return;

      const elapsedTime = timestamp - startTimeRef.current;
      const progress = Math.min(elapsedTime / duration, 1);
      const nextValue = Math.floor(progress * (targetValue - prevValueRef.current) + prevValueRef.current);
      
      setCurrentValue(nextValue);

      if (progress < 1) {
        animationFrameIdRef.current = requestAnimationFrame(step);
      } else {
        setCurrentValue(targetValue); // Ensure it ends exactly on target
        prevValueRef.current = targetValue;
      }
    };
    animationFrameIdRef.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    // Reset animation flag if targetValue changes, allowing re-animation if component re-appears
    hasAnimatedRef.current = false; 
    // If the element is already visible when targetValue changes, and it wasn't animating, start animation
    if (elementRef.current && observerRef.current) {
        // Re-observe to trigger animation if it becomes visible again
        observerRef.current.unobserve(elementRef.current);
        observerRef.current.observe(elementRef.current);
    }
  }, [targetValue]);


  return (
    <span ref={elementRef} className={className}>
      {currentValue.toLocaleString()}
    </span>
  );
};

export default AnimatedNumber;
