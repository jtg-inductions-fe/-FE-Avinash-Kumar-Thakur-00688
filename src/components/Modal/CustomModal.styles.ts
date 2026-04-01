import { Box, styled } from '@mui/material';

export const ModalContainer = styled(Box)(
    ({
        theme: {
            palette,
            typography: { pxToRem },
            spacing,
        },
    }) => ({
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: palette.background.paper,
        borderRadius: pxToRem(4),
        boxShadow: pxToRem(24),
        padding: spacing(4),
    }),
);
