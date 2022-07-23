import styled from "styled-components";

const TextContainerStyled = styled.span`
    display:flex;
    align-items: center;
    height:100%;
`

const TextStyled = styled.span`
    display:flex;
    height: 100%;
    align-items: center;
    border-radius: 4px;
    margin: 0;
    padding: 4px;

    span {
        font-size: inherit;
        font-weight: inherit;
        line-height: inherit;
        color: rgba(255, 255, 255, 0.84);

        i {
            font-size: 4px;
        }
    }
`
export {
    TextContainerStyled,
    TextStyled,
}