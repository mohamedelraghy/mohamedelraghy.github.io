import { useEffect, useRef, useState } from 'react';

interface UseInViewOptions {
    once?: boolean;
    rootMargin?: string;
}

const shouldSkipObserving = () => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
        return true;
    }

    if (typeof window.matchMedia !== 'function') {
        return false;
    }

    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const useInView = <T extends Element>({
    once = true,
    rootMargin = '0px 0px -10% 0px'
}: UseInViewOptions = {}) => {
    const ref = useRef<T | null>(null);
    const [inView, setInView] = useState(shouldSkipObserving);

    useEffect(() => {
        const element = ref.current;

        if (!element || (once && inView) || typeof IntersectionObserver === 'undefined') {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);

                    if (once) {
                        observer.disconnect();
                    }
                } else if (!once) {
                    setInView(false);
                }
            },
            { rootMargin }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [once, rootMargin, inView]);

    return { ref, inView };
};
