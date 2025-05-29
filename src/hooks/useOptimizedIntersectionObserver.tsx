
import { useEffect, useRef, useState, useCallback } from 'react';

interface UseOptimizedIntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
  initialIsIntersecting?: boolean;
}

const useOptimizedIntersectionObserver = (
  elementRef: React.RefObject<Element>,
  {
    threshold = 0,
    root = null,
    rootMargin = '0%',
    freezeOnceVisible = false,
    initialIsIntersecting = false,
  }: UseOptimizedIntersectionObserverOptions = {}
): boolean => {
  const [isIntersecting, setIsIntersecting] = useState(initialIsIntersecting);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const cleanupObserver = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
  }, []);

  useEffect(() => {
    const element = elementRef.current;

    // Si no hay elemento o no hay soporte para IntersectionObserver
    if (!element || typeof IntersectionObserver !== 'function') {
      return cleanupObserver;
    }

    // Si ya es visible y está congelado, no crear observer
    if (freezeOnceVisible && isIntersecting) {
      return cleanupObserver;
    }

    // Limpiar observer anterior si existe
    cleanupObserver();

    // Crear nuevo observer con throttling optimizado
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting;
        
        setIsIntersecting(isElementIntersecting);

        // Si está congelado y ahora es visible, desconectar observer
        if (freezeOnceVisible && isElementIntersecting && observerRef.current) {
          observerRef.current.unobserve(element);
        }
      },
      {
        threshold,
        root,
        rootMargin,
      }
    );

    // Observar elemento
    observerRef.current.observe(element);

    // Cleanup function
    return cleanupObserver;
  }, [
    elementRef,
    threshold,
    root,
    rootMargin,
    freezeOnceVisible,
    isIntersecting,
    cleanupObserver,
  ]);

  // Cleanup al desmontar
  useEffect(() => {
    return cleanupObserver;
  }, [cleanupObserver]);

  return isIntersecting;
};

export default useOptimizedIntersectionObserver;
