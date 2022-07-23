import NavBarContainer from "./NavBarContainer";
import { SideBarStyled, LogoStyled } from "./styles";

const SideBar = () => {
    return (
        <SideBarStyled>
            <LogoStyled>
                <img src = {"https://www.apps.disneyplus.com/assets-ui-lib/images/logo-d-plus-horizontal.a5418b7de68995d6dce4.svg"} />
            </LogoStyled>
            <NavBarContainer/>
        </SideBarStyled>
    )
}




export default SideBar;