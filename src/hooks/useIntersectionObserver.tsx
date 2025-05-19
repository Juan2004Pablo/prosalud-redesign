
import { useState, useEffect, RefObject } from 'react';

interface Args extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

function useIntersectionObserver(
  elementRef: RefObject<Element>,
  {
    threshold = 0.1,
    root = null,
    rootMargin = '0%',
    freezeOnceVisible = true,
  }: Args,
): boolean {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

  useEffect(() => {
    const node = elementRef?.current;
    
    if (!node) {
      // If the target element isn't available yet, do nothing.
      // isIntersecting will remain false until the node is available and intersects.
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (freezeOnceVisible) {
            observer.unobserve(node);
          }
        } else {
          // Only set to false if not freezing once visible.
          if (!freezeOnceVisible) {
            setIsIntersecting(false);
          }
        }
      },
      { threshold, root, rootMargin }
    );

    observer.observe(node);

    return () => {
      // Cleanup: unobserve the node when the component unmounts or dependencies change.
      observer.unobserve(node);
    };
  }, [elementRef, threshold, root, rootMargin, freezeOnceVisible]); // Dependencies for the effect

  return isIntersecting;
}

export default useIntersectionObserver;
