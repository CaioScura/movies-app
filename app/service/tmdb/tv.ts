import axios from "axios";
import { Media } from "@/app/types/media";

const API_KEY = '87eb939d5c4b4ce27aa6a9e4221b8629';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

interface TmdbTv {
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    vote_average: number;
}

interface TmdbTvResponse {
    results: TmdbTv[];
    total_pages: number;
}

interface GetTvResult {
    results: Media[];
    totalPages: number;
}


// transforma uma serie da TMDB no formato padronizado Media
function normalizeTv(tv: TmdbTv): Media {
    return {
        id: tv.id,
        title: tv.name,
        overview: tv.overview,
        image: tv.poster_path ? `${IMAGE_BASE_URL}${tv.poster_path}` : '',
        rating: tv.vote_average ?? 0,
        type: "tv-show",
    };
}


export async function getTvShows(page: number, query?: string): Promise<GetTvResult> {
    const isSearching = Boolean(query && query.trim().length > 0);

    const response = await axios<TmdbTvResponse>({
        method: 'get',
        url: isSearching ? `${BASE_URL}/search/tv` : `${BASE_URL}/discover/tv`,
        params: {
            api_key: API_KEY,
            language: 'pt-BR',
            page: page,
            ...(isSearching ? { query } : {}),
        },
    });

    return {
        results: response.data.results.map(normalizeTv),
        totalPages: response.data.total_pages,
    };
}