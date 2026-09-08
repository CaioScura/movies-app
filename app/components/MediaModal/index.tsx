'use client';

import { useEffect, useState } from "react";
import { Media } from "@/app/types/media";
import { getMovieDetails } from "@/app/service/tmdb/movies";
import { getTvShowDetails } from "@/app/service/tmdb/tv";
import StarRating from "../StarRating";
import './index.scss';

export interface Props {
    media: Media;
    onClose: () => void;
}

// mapeia o tipo interno do Media pra um rotulo legivel no modal
const TYPE_LABELS: Record<Media["type"], string> = {
    "movie": "Filme",
    "tv-show": "Série",
    "anime": "Anime",
};

export default function MediaModal({ media: initialMedia, onClose }: Props) {
    // anime ja chega com todos os dados extras na propria listagem;
    // filme e serie tem a mais generos/duracao/status apos a busca de mais detalhes
    const [media, setMedia] = useState(initialMedia);
    const [isLoadingDetails, setIsLoadingDetails] = useState(initialMedia.type !== "anime");

    // fecha o modal com Esc e trava o scroll da pagina de fundo enquanto ele estiver aberto
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [onClose]);

    // busca os detalhes completos (generos, duracao, status, tagline) so pra filme/serie
    useEffect(() => {
        if (initialMedia.type === "anime") {
            return;
        }

        let isCancelled = false;

        const loadDetails = async () => {
            try {
                const details = initialMedia.type === "movie"
                    ? await getMovieDetails(initialMedia.id)
                    : await getTvShowDetails(initialMedia.id);

                if (!isCancelled) {
                    setMedia(details);
                }
            } catch (error) {
                // se falhar, so mantem os dados basicos que ja tinham vindo da listagem
                console.error('Erro ao buscar detalhes:', error);
            } finally {
                if (!isCancelled) {
                    setIsLoadingDetails(false);
                }
            }
        };

        loadDetails();

        return () => {
            isCancelled = true;
        };
    }, [initialMedia]);

    return (
        <div
            className="media-modal-backdrop"
            // fecha ao clicar fora do card (fora do conteudo do modal)
            onClick={onClose}
        >
            <div
                className="media-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="media-modal-title"
                // impede que o clique dentro do card feche o modal
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    type="button"
                    className="media-modal__close"
                    aria-label="Fechar"
                    onClick={onClose}
                >
                    ✕
                </button>

                <div className="media-modal__poster">
                    <img src={media.image} alt={media.title} />
                </div>

                <div className="media-modal__content">
                    <span className="media-modal__badge">
                        {TYPE_LABELS[media.type]}
                    </span>

                    <h2 id="media-modal-title" className="media-modal__title">
                        {media.title}
                    </h2>

                    {media.tagline &&
                        <p className="media-modal__tagline">
                            "{media.tagline}"
                        </p>
                    }

                    {media.rating > 0 &&
                        <StarRating rating={media.rating} />
                    }

                    {/* ano, duracao/episodios e status */}
                    <div className="media-modal__meta">
                        {media.year && <span>{media.year}</span>}
                        {media.duration && <span>{media.duration}</span>}
                        {media.status && <span>{media.status}</span>}
                    </div>

                    {media.genres && media.genres.length > 0 &&
                        <div className="media-modal__genres">
                            {media.genres.map((genre) => (
                                <span key={genre} className="media-modal__genre">
                                    {genre}
                                </span>
                            ))}
                        </div>
                    }

                    <p className="media-modal__overview">
                        {media.overview || "Sinopse não disponível."}
                    </p>

                    {isLoadingDetails &&
                        <p className="media-modal__loading-details">
                            Carregando mais detalhes...
                        </p>
                    }
                </div>
            </div>
        </div>
    );
}
