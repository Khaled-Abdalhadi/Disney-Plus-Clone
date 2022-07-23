import styled from "styled-components";

const ShadowMaskLeft = styled.div`
    position:absolute;
    inset:0;
    height:100%;
    z-index: 0;
    //add transition
    background:linear-gradient(176.27deg,rgba(15,16,20,0) 57.9%,rgba(15,16,20,0.01) 64.8%,rgba(15,16,20,0.05) 67.56%,#0f1014 96.94%),linear-gradient(90deg,#0f1014,rgba(15,16,20,0.85) 16.15%,rgba(15,16,20,0.73) 25.52%,rgba(15,16,20,0.6) 32.81%,rgba(15,16,20,0.05) 52.08%,rgba(15,16,20,0) 65.1%);
`

const ShadowMaskBottom = styled.div`
    position:absolute;
    inset:0;
    width:100%;
    height:100%;
    z-index:0;
    background: linear-gradient(180deg,rgba(15,16,20,0),#0f1014);
`

export {ShadowMaskLeft, ShadowMaskBottom };