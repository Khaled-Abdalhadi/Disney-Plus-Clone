import styled from "styled-components";
import { ShadowMaskLeft} from "./styles/ShadowMaskStyled";

const ShadowMask = () => {

    return (
        <ShadowContainer>
            <ShadowMaskLeft />
        </ShadowContainer>
    )
}

const ShadowContainer = styled.div`

    position: absolute;
    inset:0;
`
export default ShadowMask;