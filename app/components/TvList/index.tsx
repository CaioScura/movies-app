'use client';

import axios from "axios";
import "./index.scss";
import { useEffect, useState } from "react";
import { Tv } from "@/app/types/tv";
import { MovieCard } from "../MovieCard";
import PaginationList from "../PaginationList";
import { TvCard } from "../TvCard";

export default function TvList({ searchQuery }: { searchQuery: string }) {
    const [tvs, setTvs] = useState<Tv[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    //para criacao de paginas com mais series de tv
    const [page, setPage] = useState(1);

    //total de paginas disponiveis na api
    const [totalpages, setTotalPages] = useState(1);

    useEffect(() => {
    setPage(1);
}, [searchQuery]);

    useEffect(() => {
        getTvs();
    }, [page, searchQuery]);
        

    const getTvs = async () => {
        setIsLoading(true);

        try{
            //pesquisa de series de tv na api, caso o usuario digite algo na barra de pesquisa
            const isSearching = searchQuery.trim().length > 0;

            const response = await axios({
                method: 'get',
                url: isSearching
                    ? 'https://api.themoviedb.org/3/search/tv'
                    : 'https://api.themoviedb.org/3/discover/tv',
                params: {
                    api_key: '87eb939d5c4b4ce27aa6a9e4221b8629',
                    language: 'pt-BR',
                    page: page,
                    ...(isSearching ? { query: searchQuery } : {})
                }
            });

            //popular a listagem de series de tv
            setTvs(response.data.results);

            //salvar o total de paginas disponiveis na api
            setTotalPages(response.data.total_pages);
        }
        catch (error) {
            console.error('Erro ao buscar series de tv:', error);
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
                    aria-label="Carregando series de tv"
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
                    {tvs.map((tv) => <TvCard
                        key={tv.id}
                        tv={tv} />
    
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