'use client';

import axios from "axios";
import "./index.scss";
import { useEffect, useState } from "react";
import { Movie } from "@/app/types/movie";
import { MovieCard } from "../MovieCard";
import PaginationList from "../PaginationList";


export default function MovieList() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    //para criacao de paginas com maios filmes
    const [page, setPage] = useState(1);

    //total de paginas disponiveis na api
    const [totalpages, setTotalPages] = useState(1);

    useEffect(() => {
        getMovies();
    }, [page]); // requisição da api sera chamada apenas uma vez, quando o componente for montado

    const getMovies = async () => {
        setIsLoading(true);

        try{
            const response = await axios({
                method: 'get',
                url: 'https://api.themoviedb.org/3/discover/movie',
                params: {
                    api_key: '87eb939d5c4b4ce27aa6a9e4221b8629',
                    language: 'pt-BR',
                    page: page
                }
            });

            //popular a listagem de filmes
            setMovies(response.data.results);

            //salvar o total de paginas disponiveis na api
            setTotalPages(response.data.total_pages);
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
                {movies.map((movie) => <MovieCard
                    key={movie.id}
                    movie={movie} />

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