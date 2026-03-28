import { LocationOn } from '@mui/icons-material';
import { Box, Card, CardContent, Stack, Typography } from '@mui/material';

import { CinemaDetailsProps } from './CinemaDetails.types';

/**
 * This component displays details of cinema
 *
 * @param name - Name of the cinema which need to be displayed
 * @param location - Location of the cinema displayed in card
 */
export const CinemaDetailsCard = ({ name, location }: CinemaDetailsProps) => (
    <Card>
        <CardContent>
            <Stack gap={3}>
                <Typography variant="h2">{name}</Typography>
                <Box display="flex" gap={2}>
                    <LocationOn />
                    <Typography variant="h4">{location}</Typography>
                </Box>
            </Stack>
        </CardContent>
    </Card>
);
