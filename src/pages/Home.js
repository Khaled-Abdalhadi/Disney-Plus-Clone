import { CategoriesWrapperStyled, PageContent} from "../components/styles";
import {MainContainer, BackgroundImg, Studios, Categories, SideBar} from "../components/";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setActiveCarousel, setMovieDetails, } from "../features//pageSlice";
import {homeCarousel} from "../data/heroData"


const Home = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setActiveCarousel({
            activeCarousel: homeCarousel
        }))
       dispatch(setMovieDetails({
        movieDetails: {...homeCarousel[0]},
       }))
    }, [])

    return (
        <>
            <SideBar/>
            <PageContent>
                <BackgroundImg/>
                <MainContainer/>
                <CategoriesWrapperStyled>
                <Studios/>
                <Categories categoriesForPage = "home"/>
                </CategoriesWrapperStyled>
            </PageContent>
        </>
    )
}

export default Home;