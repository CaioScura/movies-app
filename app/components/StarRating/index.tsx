import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import './index.scss';

export interface Props {
    rating: number;
}

export default function StarRating(props: Props) {
    const numStars = Math.round(props.rating / 2); // arredonda a nota para o inteiro mais próximo

    const fullStars = [];
    const emptyStars = [];

    //faz a contagem de estrelas cheias e vazias
    for (let i = 0; i < 5; i++) {
        if (i < numStars) {
            fullStars.push(i);
        }else{
            emptyStars.push(i);
        }
    }

    return(
        <div className="movie-rating">
            {/* estrelas cheias */}
            {fullStars.map((index) => (
                <FaStar key={index} />
            ))}

            {/* estrelas vazias */}
            {emptyStars.map((index) => (
                <FaRegStar key={index} />
            ))}
        </div>
    );
}