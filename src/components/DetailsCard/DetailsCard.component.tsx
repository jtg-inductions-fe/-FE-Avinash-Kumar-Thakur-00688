import { LocationOn } from '@mui/icons-material';
import { Box, Card, CardContent, Stack, Typography } from '@mui/material';

import { DetailsProps } from './DetailsCard.types';

/**
 * Component used to display details in card
 *
 * @param title - Title to be displayed in details card
 * @param subtitle - Subtitle to be displayed in details card
 */
export const DetailsCard = ({ title, subtitle }: DetailsProps) => (
    <Card>
        <CardContent>
            <Stack gap={3}>
                <Typography variant="h2">{title}</Typography>
                <Box display="flex" gap={2}>
                    <LocationOn />
                    <Typography variant="h4">{subtitle}</Typography>
                </Box>
            </Stack>
        </CardContent>
    </Card>
);
