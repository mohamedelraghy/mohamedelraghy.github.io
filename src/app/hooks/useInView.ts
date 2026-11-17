import { useEffect, useRef, useState } from 'react';

const ROOT_MARGIN = '0px 0px -10% 0px';

const shouldSkipObserving = () => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
        return true;
    }

    if (typeof window.matchMedia !== 'function') {
        return false;
    }

    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const useInView = <T extends Element>() => {
    const ref = useRef<T | null>(null);
    const [inView, setInView] = useState(shouldSkipObserving);

    useEffect(() => {
        const element = ref.current;

        if (!element || inView || typeof IntersectionObserver === 'undefined') {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { rootMargin: ROOT_MARGIN }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [inView]);

    return { ref, inView };
};
