import { Tv } from "@/app/types/tv";
import StarRating from "../StarRating";
import './index.scss';

export interface Props {
    tv: Tv;
}

export function TvCard(props: Props) {
    const tv = props.tv;

    return (
        <li className="movie-card">
            <div className="movie-poster">
                <img src={`https://image.tmdb.org/t/p/original${tv.poster_path}`} alt={tv.title} />
            </div>

            <div className="movie-info">
                <p className="movie-title">
                    {tv.title}
                </p>

                {/* se as estrelas foram maior que 0, ira mostrar elas  */}
                {tv.vote_average > 0 &&
                    <StarRating rating={tv.vote_average} />
                }

                <div className="hidden-content">
                    {tv.overview &&
                        <p className="movie-overview">
                            {tv.overview.length > 100 
                                ? tv.overview.substring(0, 100) 
                                + '...' : tv.overview
                            }
                        </p>
                    }
                    

                    <button className="btn-default">
                        Ver mais
                    </button>

                </div>
            </div>

            

            
        </li>
    );

}