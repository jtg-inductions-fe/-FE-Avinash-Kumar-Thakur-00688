import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Chip,
    Stack,
    Typography,
    useTheme,
} from '@mui/material';

import MoviePlaceholder from '@assets/images/movie-placeholder.webp';
import { MOVIE_CARD_POSTER_HEIGHT, MOVIE_CARD_WIDTH } from '@constant';
import { MovieResponseData } from '@services';

/**
 * This component is used to display the movies details in a card
 *
 * @param name - Movie name which need to be displayed
 * @param languages - Movie can be in multiple languages
 * @param genres - Genres of the movie
 */
export const MovieCard = ({ movie }: { movie: MovieResponseData }) => {
    /** Hooks */
    const { palette } = useTheme();

    /** Constants */
    const languages = movie.languages;
    const genres = movie.genres;

    return (
        <Card sx={{ width: MOVIE_CARD_WIDTH, borderRadius: 3 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height={MOVIE_CARD_POSTER_HEIGHT}
                    src={movie.poster_url || MoviePlaceholder}
                    alt={movie.name}
                    loading="lazy"
                    sx={{ background: palette.text.secondary }}
                />
                <CardContent>
                    <Stack spacing={3}>
                        <Typography
                            gutterBottom
                            variant="h4"
                            component="div"
                            noWrap
                        >
                            {movie.name}
                        </Typography>

                        <Stack flexDirection="row" gap={1}>
                            {genres.slice(0, 2).map((item) => (
                                <Chip
                                    color="primary"
                                    key={item.id}
                                    label={item.genre_name}
                                    size="small"
                                    variant="outlined"
                                />
                            ))}

                            {genres.length > 2 && (
                                <Chip
                                    color="primary"
                                    label={`+${genres.length - 2} More`}
                                    size="small"
                                    variant="outlined"
                                />
                            )}
                        </Stack>

                        <Typography
                            variant="body2"
                            color="textSecondary"
                            noWrap
                        >
                            {languages.map((item) => item.lang_name).join(', ')}
                        </Typography>
                    </Stack>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};
