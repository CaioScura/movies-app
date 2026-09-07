import { Media } from "@/app/types/media";
import StarRating from "../StarRating";
import './index.scss';

export interface Props {
    media: Media;
}

export function MediaCard(props: Props) {
    const media = props.media;

    return (
        <li className="media-card">
            <div className="media-poster">
                <img src={media.image} alt={media.title} />
            </div>

            <div className="media-info">
                <p className="media-title">
                    {media.title}
                </p>

                {/* se as estrelas foram maior que 0, ira mostrar elas  */}
                {media.rating > 0 &&
                    <StarRating rating={media.rating} />
                }

                <div className="hidden-content">
                    {media.overview &&
                        <p className="media-overview">
                            {media.overview.length > 100
                                ? media.overview.substring(0, 100)
                                + '...' : media.overview
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