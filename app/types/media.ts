export interface Media {
    id: number;
    title: string;
    overview: string;
    image: string;
    rating: number;
    type: "movie" | "tv-show" | "anime";

    //dados extras, mais detalhes
    // pra filme/serie so vem preenchidos apos a busca de detalhes (ver getMovieDetails/getTvShowDetails);
    // pra anime ja vem de graca na propria listagem
    year?: string;
    genres?: string[];
    status?: string;
    duration?: string;
    tagline?: string;
}