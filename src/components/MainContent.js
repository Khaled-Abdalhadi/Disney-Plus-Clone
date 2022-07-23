
import {SliderMovieDetails, MovieCarousel} from "/";
import {MainContentStyled} from "./styles"
import {Link} from "react-router-dom"
import { selectMovieDetails } from "../features/pageSlice";
import { useSelector } from "react-redux";

const MainContent = () => {
    const movieDetails = useSelector(selectMovieDetails);
    const {movie_tv, title, doc_id} = movieDetails;

    function handleClick() {
        window.localStorage.setItem('category', JSON.stringify('hero carousel'))
    }

    return (
        <Link to = {`/${movie_tv}/${title}/${doc_id}`}
            onClick  = {handleClick}
        >
            <MainContentStyled>
                <SliderMovieDetails />
                <MovieCarousel/>
            </MainContentStyled>
         </Link>
    )
}



export default MainContent;