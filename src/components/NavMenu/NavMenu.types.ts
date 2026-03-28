import { NavItemTypes } from 'components/NavLink';

import { PopoverOrigin, SxProps } from '@mui/material';

/**
 * Props for the nav menu component
 */
export interface NavMenuProps {
    /**
     * Unique identifier for the menu
     */
    id?: string;
    /**
     * It's used to set the position of the menu.
     */
    anchorEl: HTMLElement | null;
    /**
     * This is the point on the anchor where the popover's anchorEl will attach to
     */
    anchorOrigin?: PopoverOrigin;
    /**
     * This is the point on the popover which will attach to the anchor's origin.
     */
    transformOrigin?: PopoverOrigin;
    /**
     * Function to close the menu
     */
    closeNavMenu: () => void;
    /**
     * Additional style to the component
     */
    sx?: SxProps;
    /**
     * Items to be displayed in menu
     */
    navItems: NavItemTypes[];
    /**
     * Always keep the children in the DOM
     */
    keepMounted?: boolean;
}
