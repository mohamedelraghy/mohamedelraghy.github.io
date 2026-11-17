import { keyframes } from '@mui/material/styles';

export const EASE_OUT = 'cubic-bezier(.2,.7,.2,1)';
export const STAGGER_SECONDS = 0.15;

export const fadeUp = keyframes`
    from {
        opacity: 0;
        transform: translateY(14px);
    }
    to {
        opacity: 1;
        transform: none;
    }
`;

export const drawLine = keyframes`
    from {
        width: 0;
    }
    to {
        width: 100%;
    }
`;

export const rotateWord = keyframes`
    0%, 22% {
        transform: translateY(0);
    }
    33%, 55% {
        transform: translateY(-1.08em);
    }
    66%, 88% {
        transform: translateY(-2.16em);
    }
    100% {
        transform: translateY(0);
    }
`;

export const pulse = keyframes`
    0% {
        box-shadow: 0 0 0 0 rgba(22, 163, 74, .55);
    }
    100% {
        box-shadow: 0 0 0 9px rgba(22, 163, 74, 0);
    }
`;

export const fillDown = keyframes`
    from {
        height: 0;
    }
    to {
        height: calc(100% - 12px);
    }
`;

export const reducedMotionStyles = {
    '@media (prefers-reduced-motion: reduce)': {
        '*, *::before, *::after': {
            animation: 'none !important',
            transition: 'none !important'
        },
        html: {
            scrollBehavior: 'auto !important'
        }
    }
};

// Paper never scrolls, so nothing may stay hidden waiting for the scroll observer.
export const printStyles = {
    '@media print': {
        '.reveal': {
            opacity: '1 !important',
            transform: 'none !important',
            animation: 'none !important'
        },
        '.draw-line': {
            width: '100% !important',
            animation: 'none !important'
        },
        '.timeline-fill': {
            height: 'calc(100% - 12px) !important',
            animation: 'none !important'
        }
    }
};
