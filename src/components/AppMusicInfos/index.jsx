import styled from "styled-components";
import { datas } from "../../datas/datas";
import { PlayingMusicContext, ThemeContext } from "../../utils/context";
import { useContext } from "react";

const MusicInfosDiv = styled.div`
    width: 100%;
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${({ theme }) => (theme === "light" ? "#000" : "#fff")};
`;

const MusicAuthorSpan = styled.span`
    font-size: 17px;
    opacity: 0.7;
`;

const StyledSpan = styled.span`
    font-size: 18px;
    text-decoration: underline;
    margin-bottom: 5px;
`;

const MusicTitleSpan = styled.span`
    font-size: 20px;
`;

const AppMusicInfos = () => {
    // Context section
    const { musicIndex } = useContext(PlayingMusicContext);
    const { theme } = useContext(ThemeContext);

    return (
        <MusicInfosDiv theme={theme}>
            <StyledSpan>Now Playing</StyledSpan>
            <MusicTitleSpan>{datas[musicIndex].title}</MusicTitleSpan>
            <MusicAuthorSpan>{datas[musicIndex].author}</MusicAuthorSpan>
        </MusicInfosDiv>
    );
};

export default AppMusicInfos;
