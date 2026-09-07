import axios from "axios";
import { Media } from "@/app/types/media";


const API_KEY = '87eb939d5c4b4ce27aa6a9e4221b8629';
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

interface TmdbMovie {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    vote_average: number;
}

interface TmdbMovieResponse {
    results: TmdbMovie[];
    total_pages: number;
}

interface GetMoviesResult {
    results: Media[];
    totalPages: number;
}


//vai pegar um filme do TMDB e deixar no formato padronizado do Media
function normalizeMovie(movie: TmdbMovie): Media {
    return {
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        image: movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : '',
        rating: movie.vote_average ?? 0,
        type: "movie",
    };
}

export async function getMovies(page: number, query?: string): Promise<GetMoviesResult> {
    const isSearching = Boolean(query && query.trim().length > 0);

    const response = await axios<TmdbMovieResponse>({
        method: 'get',
        url: isSearching ? `${BASE_URL}/search/movie` : `${BASE_URL}/discover/movie`,
        params: {
            api_key: API_KEY,
            language: 'pt-BR',
            page: page,
            ...(isSearching ? { query } : {}),
        },
    });

    return {
        results: response.data.results.map(normalizeMovie),
        totalPages: response.data.total_pages,
    };
}