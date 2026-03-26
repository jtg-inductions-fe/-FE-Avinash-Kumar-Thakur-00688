import { NavLink } from 'react-router-dom';

import { styled } from '@mui/material';

export const StyledLink = styled(NavLink)(
    ({
        theme: {
            palette,
            typography: { fontWeightBold },
        },
    }) => ({
        textDecoration: 'none',
        color: palette.text.primary,

        '&.active': {
            color: palette.primary.main,
            fontWeight: fontWeightBold,
        },
    }),
);
