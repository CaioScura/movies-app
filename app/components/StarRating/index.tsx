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
        <div>
            {fullStars}
            {emptyStars}
        </div>
    );
}