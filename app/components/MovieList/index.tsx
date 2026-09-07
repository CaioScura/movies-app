'use client';

import "./index.scss";
import { useEffect, useState } from "react";
import { Media } from "@/app/types/media";
import { getMovies } from "@/app/service/tmdb/movies";
import { MediaCard } from "../MediaCard";
import PaginationList from "../PaginationList";


interface MovieListProps {
    searchQuery: string;
    // avisa a tela sobre o poster em destaque atual, pra usar como fundo em vidro fosco
    onBackdropChange?: (image: string | null) => void;
}

export default function MovieList({ searchQuery, onBackdropChange }: MovieListProps) {
    const [movies, setMovies] = useState<Media[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);


    //para criacao de paginas com maios filmes
    const [page, setPage] = useState(1);


    //total de paginas disponiveis na api
    const [totalpages, setTotalPages] = useState(1);

    useEffect(() => {
        setPage(1);
    }, [searchQuery]);

    useEffect(() => {
        loadMovies();
    }, [page, searchQuery]); // requisição da api sera chamada apenas uma vez, quando o componente for montado


    
    const loadMovies = async () => {
        setIsLoading(true);

        try{
            // toda a montagem da url e chamada a api ficou no service
            const response = await getMovies(page, searchQuery);

            //popular a listagem de filmes
            setMovies(response.results);

            //salvar o total de paginas disponiveis na api
            setTotalPages(response.totalPages);

            //atualiza o poster de fundo com o destaque da pagina atual
            onBackdropChange?.(response.results[0]?.image ?? null);
        }
        catch (error) {
            console.error('Erro ao buscar filmes:', error);
        }
        finally {
            setIsLoading(false);
        }
    };


    if (isLoading) {
        return (
            <div className="loading-container">
                <div
                    role="status"
                    aria-label="Carregando filmes"
                    style={{
                        width: 40,
                        height: 40,
                        border: '4px solid #5f46ffb4',
                        borderTopColor: '#6046ff',
                        borderRadius: '50%',
                        animation: 'movie-list-spinner 0.8s linear infinite',
                    }}
                />
            </div>
        )
    }

    return(
        <><ul className="movie-list">
                {movies.map((movie) => <MediaCard
                    key={movie.id}
                    media={movie} />

                )}
            </ul>

            <PaginationList
                page={page}
                totalPages={totalpages}
                onPageChange={(newPage) => setPage(newPage)}
            />
        </>
    );
}