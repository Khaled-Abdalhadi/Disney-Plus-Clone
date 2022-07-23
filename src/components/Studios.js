import styled from "styled-components";
import {Link} from "react-router-dom"
import studios from "../data/studios";

const Studios = ( ) => {
    return (
        <Container>
            <div className = 'studio-grid'>
                {studios.map(({name, logo, video}) => {
                    return (
                        <article className = 'studio-anchor'>
                            <Link to = {`/studio/${name}`}>
                                <img src = {logo} />
                                <video playinline loop autoplay="true" preload="auto" className = 'studio'>
                                    <source type="video/mp4" src = {video} />
                                </video>
                            </Link>
                        </article>
                    )
                })}
            </div>
        </Container>
    )
        }



const Container = styled.div`
    width: auto;
    padding-right: 64px;
    margin-block-end: 44px;
`

export default Studios;