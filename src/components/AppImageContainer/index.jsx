// import PropTypes from 'prop-types'
import styled from "styled-components";
import { ImageShowContext, MiniContext } from "../../utils/context";
import { useContext } from "react";
import { ThemeContext, PlayingMusicContext } from "../../utils/context";
import { datas } from "../../datas/datas";

const ContainerDiv = styled.div`
    width: 100%;
    height: 300px;
    margin-top: 25px;
    overflow: hidden;
    border-radius: 15px;
    box-shadow: 0px 6px 10px
        ${({ theme }) => (theme === "light" ? "#870000" : "#373737")};
    transition: all 500ms;
    &.${({ show }) => show} {
        transition: all 500ms;
        height: 0;
        margin-top: 0;
    }
`;

const MusicImg = styled.img`
    width: 100%;
    height: 100%;
    box-fit: cover;
`;

const AppImageContainer = () => {
    // Context section
    const { mini } = useContext(MiniContext);
    const { MusicImageContainerRef, show } = useContext(ImageShowContext);
    const { theme } = useContext(ThemeContext);
    const { musicIndex } = useContext(PlayingMusicContext);

    return (
        <div>
            <ContainerDiv
                mini={mini}
                theme={theme}
                ref={MusicImageContainerRef}
                show={show}
            >
                <MusicImg src={datas[musicIndex].image} alt="" />
            </ContainerDiv>
        </div>
    );
};

export default AppImageContainer;
