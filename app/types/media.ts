export interface Media {
    id: number;
    title: string;
    overview: string;
    image: string;
    rating: number;
    type: "movie" | "tv-show" | "anime";
}