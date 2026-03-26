import { To } from 'react-router-dom';

/**
 * Represent the type of items used in nav menu
 */
export interface NavItemTypes {
    /**
     * Label of the item
     */
    label: string;
    /**
     * Url of the item
     */
    path: To;
}
