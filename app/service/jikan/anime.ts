import axios from "axios";
import { Media } from "@/app/types/media";

const BASE_URL = 'https://api.jikan.moe/v4';

interface JikanAnime {
    mal_id: number;
    title: string;
    synopsis: string | null;
    score: number | null;
    images: {
        jpg: {
            image_url: string;
            large_image_url: string;
        };
    };
    year: number | null;
    status: string | null;
    episodes: number | null;
    duration: string | null;
    genres: { name: string }[];
}

// status da Jikan traduzido pra pt-BR
const STATUS_LABELS: Record<string, string> = {
    "Finished Airing": "Finalizado",
    "Currently Airing": "Em exibição",
    "Not yet aired": "Ainda não estreou",
};

interface JikanAnimeResponse {
    data: JikanAnime[];
    pagination: {
        last_visible_page: number;
    };
}

interface GetAnimesResult {
    results: Media[];
    totalPages: number;
}


// transforma um anime da Jikan no formato padronizado Media
function normalizeAnime(anime: JikanAnime): Media {
    return {
        id: anime.mal_id,
        title: anime.title,
        overview: anime.synopsis ?? '',
        image: anime.images.jpg.large_image_url || anime.images.jpg.image_url,
        rating: anime.score ?? 0,
        type: "anime",

        // esses dados ja vem de graca na propria listagem da Jikan
        year: anime.year ? String(anime.year) : undefined,
        genres: (anime.genres ?? []).map((genre) => genre.name),
        status: anime.status ? (STATUS_LABELS[anime.status] ?? anime.status) : undefined,
        duration: anime.episodes ? `${anime.episodes} episódios` : undefined,
    };
}


export async function getAnimes(page: number, query?: string): Promise<GetAnimesResult> {
    //serve para verificar se o usuario esta pesquisando
    const isSearching = Boolean(query && query.trim().length > 0);

    const response = await axios<JikanAnimeResponse>({
        method: 'get',
        url: isSearching ? `${BASE_URL}/anime` : `${BASE_URL}/top/anime`,
        timeout: 10000,
        params: {
            page,
            sfw: true, // filtra para nao pegar conteudo adulto
            ...(isSearching ? { q: query } : {}),
        },
    });

    return {
        results: response.data.data.map(normalizeAnime),
        totalPages: response.data.pagination.last_visible_page,
    };
}