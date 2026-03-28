import {
    Button,
    Card,
    CardContent,
    Divider,
    Grid2,
    Stack,
    Typography,
} from '@mui/material';

import { MovieDataType, SlotDataType } from '@services';
import { formatAmount, formatDate, formatTime } from '@utils';

/**
 * Container display the slots of the movie
 *
 * @param name - Name of the movie which need to display
 * @param languages - Languages in which movie is present
 * @param slots - It contains the details of slot which include date, time and price
 */
export const MovieSlot = ({ movies }: { movies: MovieDataType[] }) => {
    /** Functions */
    /**
     * Function that group the slot on base of date
     *
     * @param slots - Slot details which consist of id, date, time and price
     * @returns - Object which consist of string type key and value as slot date type
     */
    const groupSlotByDate = (slots: SlotDataType[]) =>
        slots.reduce<Record<string, SlotDataType[]>>((acc, slot) => {
            const date = formatDate({ date: slot.date_time });

            if (!acc[date]) {
                acc[date] = [];
            }

            acc[date].push(slot);

            return acc;
        }, {});

    return (
        <>
            {movies.map((movie) => {
                const dateSlotMap = groupSlotByDate(movie.slots || []);
                return (
                    <Card key={movie.id}>
                        <CardContent>
                            <Stack gap={4}>
                                <Stack>
                                    <Typography variant="h4">
                                        {movie.name}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        color="textDisabled"
                                    >
                                        {movie.languages
                                            .map((item) => item.lang_name)
                                            .join(', ')}
                                    </Typography>
                                </Stack>

                                <Grid2
                                    container
                                    spacing={4}
                                    alignItems="center"
                                >
                                    {Object.entries(dateSlotMap).map(
                                        ([date, slots], index, arr) => (
                                            <Grid2
                                                key={date}
                                                container
                                                size={12}
                                                alignItems="center"
                                            >
                                                <Grid2 size={{ xs: 12, md: 2 }}>
                                                    <Typography>
                                                        {date}
                                                    </Typography>
                                                </Grid2>

                                                <Grid2
                                                    size={{ xs: 12, md: 10 }}
                                                >
                                                    <Stack
                                                        direction="row"
                                                        gap={2}
                                                        flexWrap="wrap"
                                                    >
                                                        {slots.map((slot) => (
                                                            <Button
                                                                key={slot.id}
                                                                variant="outlined"
                                                                sx={{
                                                                    display:
                                                                        'flex',
                                                                    flexDirection:
                                                                        'column',
                                                                    borderColor:
                                                                        'GrayText',
                                                                }}
                                                            >
                                                                <Typography variant="caption">
                                                                    {formatTime(
                                                                        slot.date_time,
                                                                    )}
                                                                </Typography>
                                                                <Typography variant="caption">
                                                                    {formatAmount(
                                                                        Number(
                                                                            slot.price,
                                                                        ),
                                                                    )}
                                                                </Typography>
                                                            </Button>
                                                        ))}
                                                    </Stack>
                                                </Grid2>
                                                {index !== arr.length - 1 && (
                                                    <Grid2 flex={1}>
                                                        <Divider />
                                                    </Grid2>
                                                )}
                                            </Grid2>
                                        ),
                                    )}
                                </Grid2>
                            </Stack>
                        </CardContent>
                    </Card>
                );
            })}
        </>
    );
};
