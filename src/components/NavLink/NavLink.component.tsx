import { StyledLink } from './NavLink.styles';
import { NavItemTypes } from './NavLink.types';

/**
 * This component display the links with different styles for active items
 *
 * @param label - Label to be displayed for the link
 * @param path - Url of the link
 */
export const NavLink = ({ label, path }: NavItemTypes) => (
    <StyledLink key={label} to={path}>
        {label}
    </StyledLink>
);
