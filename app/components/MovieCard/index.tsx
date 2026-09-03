import { Movie } from "@/app/types/movie";
import StarRating from "../StarRating";
import './index.scss';

export interface Props {
    movie: Movie;
}

export function MovieCard(props: Props) {
    const movie = props.movie;

    return (
        <li className="movie-card">
            <div className="movie-poster">
                <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
            </div>

            <div className="movie-info">
                <p className="movie-title">
                    {movie.title}
                </p>

                {/* se as estrelas foram maior que 0, ira mostrar elas  */}
                {movie.vote_average > 0 &&
                    <StarRating rating={movie.vote_average} />
                }

                <div className="hidden-content">
                    {movie.overview &&
                        <p className="movie-overview">
                            {movie.overview.length > 100 
                                ? movie.overview.substring(0, 100) 
                                + '...' : movie.overview
                            }
                        </p>
                    }
                    

                    <button className="movie-button">
                        Ver mais
                    </button>

                </div>
            </div>

            

            
        </li>
    );

}