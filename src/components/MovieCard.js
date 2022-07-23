 import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import { setLoadPage } from "../features/pageSlice";


const MovieCard = ({movie_tv,title, cardImg, titleImg, category, doc_id}) => {
    const dispatch = useDispatch();

    function handleClick() {
        window.localStorage.setItem('category', JSON.stringify(category))
        dispatch(setLoadPage({
            loadPage: true,
        }))
    }
    return (
        <div className = 'card'>
            {title}
            <Link to = {`/${movie_tv}/${title}/${doc_id}`}
                onClick = {handleClick}
            >
                <img src = {cardImg} alt = {titleImg} />
            </Link>
        </div>
    )
}

export default MovieCard;