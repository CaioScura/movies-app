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

interface TmdbTvDetails extends TmdbTv {
    first_air_date: string | null;
    number_of_seasons: number | null;
    number_of_episodes: number | null;
    status: string | null;
    tagline: string | null;
    genres: { name: string }[];
}

interface TmdbTvResponse {
    results: TmdbTv[];
    total_pages: number;
}

interface GetTvResult {
    results: Media[];
    totalPages: number;
}

// status do TMDB traduzido pra pt-BR
const STATUS_LABELS: Record<string, string> = {
    "Returning Series": "Em exibição",
    "Planned": "Planejada",
    "In Production": "Em produção",
    "Ended": "Finalizada",
    "Canceled": "Cancelada",
    "Pilot": "Piloto",
};


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

//vai pegar os detalhes completos de uma serie do TMDB (generos, temporadas, status, etc)
function normalizeTvDetails(tv: TmdbTvDetails): Media {
    return {
        ...normalizeTv(tv),
        year: tv.first_air_date ? tv.first_air_date.slice(0, 4) : undefined,
        genres: tv.genres.map((genre) => genre.name),
        duration: tv.number_of_seasons
            ? `${tv.number_of_seasons} temporada${tv.number_of_seasons > 1 ? 's' : ''} • ${tv.number_of_episodes ?? '?'} episódios`
            : undefined,
        status: tv.status ? (STATUS_LABELS[tv.status] ?? tv.status) : undefined,
        tagline: tv.tagline || undefined,
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

// busca os detalhes completos de uma serie (chamada extra, usada so ao abrir o modal)
export async function getTvShowDetails(id: number): Promise<Media> {
    const response = await axios<TmdbTvDetails>({
        method: 'get',
        url: `${BASE_URL}/tv/${id}`,
        timeout: 10000,
        params: {
            api_key: API_KEY,
            language: 'pt-BR',
        },
    });

    return normalizeTvDetails(response.data);
}