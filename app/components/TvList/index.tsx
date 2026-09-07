'use client';

import "./index.scss";
import { useEffect, useState } from "react";
import { Media } from "@/app/types/media";
import { getTvShows } from "@/app/service/tmdb/tv";
import { MediaCard } from "../MediaCard";
import PaginationList from "../PaginationList";

interface TvListProps {
    searchQuery: string;
    // avisa a tela sobre o poster em destaque atual, pra usar como fundo em vidro fosco
    onBackdropChange?: (image: string | null) => void;
}

export default function TvList({ searchQuery, onBackdropChange }: TvListProps) {
    const [tvs, setTvs] = useState<Media[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    //para criacao de paginas com mais series de tv
    const [page, setPage] = useState(1);

    //total de paginas disponiveis na api
    const [totalpages, setTotalPages] = useState(1);

    useEffect(() => {
    setPage(1);
}, [searchQuery]);

    useEffect(() => {
        loadTvShows();
    }, [page, searchQuery]);
        

    const loadTvShows = async () => {
        setIsLoading(true);

        try{
            // toda a montagem da url e chamada a api ficou no service
            const response = await getTvShows(page, searchQuery);

            //popular a listagem de series de tv
            setTvs(response.results);

            //salvar o total de paginas disponiveis na api
            setTotalPages(response.totalPages);

            //atualiza o poster de fundo com o destaque da pagina atual
            onBackdropChange?.(response.results[0]?.image ?? null);
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
                    {tvs.map((tv) => <MediaCard
                        key={tv.id}
                        media={tv} />
    
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