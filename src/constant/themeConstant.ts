/**
 * Color palette used in the application.
 * @constant
 */
export const COLORS = {
    PRIMARY: {
        MAIN: '#eb4e62',
        CONTRAST_TEXT: '#FFFFFF',
    },
    BACKGROUND: {
        DEFAULT: '#f2f5f9',
        PAPER: '#f5f5f5',
    },
    TEXT: {
        PRIMARY: '#222222',
        SECONDARY: '#333333',
        DISABLED: '#666666',
    },
} as const;

/**
 * Breakpoints used in the application.
 * @constant
 */
export const BREAKPOINTS = {
    XS: 0,
    SM: 768,
    MD: 1024,
    LG: 1440,
    XL: 1920,
} as const;

/**
 * Base font size in pixels.
 * @constant
 */
export const HTML_FONT_SIZE = 10;

/**
 * Scaling factor used for spacing.
 * @constant
 */
export const SCALING_FACTOR = 4;
