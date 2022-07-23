import { CategoriesWrapperStyled, PageContent} from "../components/styles";
import {MainContainer, BackgroundImg, Categories, SideBar} from "../components/";
import { useEffect } from "react";
import { setActiveCarousel, setMovieHero, setMovieDetails} from "../features/pageSlice";
import { useDispatch } from "react-redux";
import {moviesCarousel} from "../data/heroData"

const Movies = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setActiveCarousel({
            activeCarousel: moviesCarousel,
        }))
        dispatch(setMovieHero({
            movieHero: moviesCarousel[0],
        }))
        dispatch(setMovieDetails({
            movieDetails: {...moviesCarousel[0]},
        }))
    }, []
    )
    return (
        <>
            <SideBar/>
            <PageContent>
                <BackgroundImg/>
                <MainContainer />
                <CategoriesWrapperStyled>
                    <Categories categoriesForPage = "movies" />
                </CategoriesWrapperStyled>
            </PageContent>
        </>
    )
}

export default Movies;