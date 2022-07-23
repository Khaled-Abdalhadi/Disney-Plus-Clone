import { CategoriesWrapperStyled, PageContent} from "../components/styles";
import {MainContainer, BackgroundImg, Categories, SideBar} from "../components/";
import { useEffect } from "react";
import { setActiveCarousel, setMovieDetails, setMovieHero } from "../features/pageSlice";
import {seriesCarousel} from "../data/heroData";
import { useDispatch } from "react-redux";

const Series = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setActiveCarousel({
            activeCarousel: seriesCarousel
        }))
        dispatch(setMovieHero({
            movieHero: seriesCarousel[0],
        }))
        dispatch(setMovieDetails({
            movieDetails: seriesCarousel[0],
        }))
    }, [])

    return (
        <>
            <SideBar/>
            <PageContent>
                <BackgroundImg/>
                <MainContainer />
                <CategoriesWrapperStyled>
                    <Categories categoriesForPage = "shows" />
                </CategoriesWrapperStyled>
            </PageContent>
         </>
    )
}

export default Series;