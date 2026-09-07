'use client';

import "./index.scss";
import { useEffect, useState } from "react";
import { Media } from "@/app/types/media";
import { getAnimes } from "@/app/service/jikan/anime";
import { MediaCard } from "../MediaCard";
import PaginationList from "../PaginationList";

export default function AnimeList({ searchQuery }: { searchQuery: string }) {
    const [animes, setAnimes] = useState<Media[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    //para criacao de paginas com mais animes
    const [page, setPage] = useState(1);

    //total de paginas disponiveis na api
    const [totalpages, setTotalPages] = useState(1);

    // sempre que o termo de busca mudar, volta pra primeira pagina
    useEffect(() => {
        setPage(1);
    }, [searchQuery]);

    useEffect(() => {
        loadAnimes();
    }, [page, searchQuery]);

    const loadAnimes = async () => {
        setIsLoading(true);

        try{
            // toda a montagem da url e chamada a api ficou no service
            const response = await getAnimes(page, searchQuery);

            //popular a listagem de animes
            setAnimes(response.results);

            //salvar o total de paginas disponiveis na api
            setTotalPages(response.totalPages);
        }
        catch (error) {
            console.error('Erro ao buscar animes:', error);
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
                    aria-label="Carregando animes"
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
                {animes.map((anime) => <MediaCard
                    key={anime.id}
                    media={anime} />

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
