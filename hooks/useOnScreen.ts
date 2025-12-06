import { useState, useEffect, useRef, RefObject } from 'react';

/**
 * Hook to detect when an element is visible on screen using Intersection Observer
 * @param options - IntersectionObserver options
 * @returns Tuple of [ref, isVisible]
 */
export const useOnScreen = (
  options?: IntersectionObserverInit
): [RefObject<HTMLDivElement | null>, boolean] => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, ...options }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, options]);

  return [ref, isVisible];
};

