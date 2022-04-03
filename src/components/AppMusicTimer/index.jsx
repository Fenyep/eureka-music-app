import { useContext } from "react";
import styled from "styled-components";
import { PlayingMusicContext, ThemeContext } from "../../utils/context";

const MusicPlayerDurationDiv = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${({ theme }) => (theme === "light" ? "#000" : "#fff")};
    font-size: 13px;
`;

const AppMusicTimer = () => {
    // Context section
    const { currentMusicTimeRef, totalMusicDurationRef } =
        useContext(PlayingMusicContext);
    const { theme } = useContext(ThemeContext);

    return (
        <MusicPlayerDurationDiv theme={theme}>
            <span ref={currentMusicTimeRef}>--:--</span>
            <span ref={totalMusicDurationRef}>--:--</span>
        </MusicPlayerDurationDiv>
    );
};

export default AppMusicTimer;
