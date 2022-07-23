
import { MainContainerStyled, ShadowMaskBottom } from "./styles"
import {MainContent, ShadowMask} from "/";



const MainContainer = () => {
    return (
        <MainContainerStyled>
            <ShadowMask/>
            <ShadowMaskBottom/>
            <MainContent/>
        </MainContainerStyled> 
    )
}



export default MainContainer;