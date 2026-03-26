/**
 * Type of the language item
 */
export type LanguagesType = {
    /**
     * Unique identifier of the item
     */
    id: number;
    /**
     * Language name
     */
    lang_name: string;
};

/**
 * Type of the genre item
 */
export type GenresType = {
    /**
     * Unique identifier of the item
     */
    id: number;
    /**
     * Genre of the movie
     */
    genre_name: string;
};

/**
 * Type of the movie response
 */
export type MovieResponseData = {
    /**
     * Unique identifier of the movie
     */
    id: number;
    /**
     * Languages of the movie
     */
    languages: LanguagesType[];
    /**
     * Genres of the movie
     */
    genres: GenresType[];
    /**
     * Poster url of the movie
     */
    poster_url: string;
    /**
     * Name of the movie
     */
    name: string;
    /**
     * Description of the movie
     */
    description: string;
    /**
     * Release date of the movie
     */
    release_date: string;
    /**
     * Duration of the movie
     */
    duration: string;
};

/**
 * Type of movie api response
 */
export type MovieApiResponseType = MovieResponseData[];

/**
 * Type of the movie api params
 */
export type MovieApiParamType = {
    languages?: string;
    genres?: string;
    date?: string;
};

/**
 * Language data response type
 */
export type LanguageApiResponseType = LanguagesType[];

/**
 * Genre data response type
 */
export type GenreApiResponseType = GenresType[];

/**
 * Type of the transform data
 */
export type FilterOptionType = {
    id: number;
    label: string;
}[];
