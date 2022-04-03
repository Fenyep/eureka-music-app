import styled from "styled-components";
import {
    ShuffleRounded,
    RepeatOneRounded,
    RepeatRounded,
    PlayArrowRounded,
    PauseRounded,
    SkipNextRounded,
    SkipPreviousRounded,
    QueueMusic,
} from "@material-ui/icons";
import { useContext } from "react";
import {
    MusicListShowContext,
    ThemeContext,
    PlayingMusicContext,
} from "../../utils/context";

const ControllersDiv = styled.div`
    position: relative;
    width: 100%;
    z-index: 10;
    height: auto;
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    user-select: none;
    color: ${({ theme }) => (theme === "light" ? "#000" : "#fff")};
`;

const PlayButtonDiv = styled.div`
    position: relative;
    width: 65px;
    height: 65px;
    display: flex;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    background: green;
    color: ${({ theme }) => (theme === "light" ? "black" : "white")};
    background: white;
    border: 1px solid #000;
    box-shadow: 0px 2px 2px
        ${({ theme }) => (theme === "light" ? "#373737" : "#870000")};
    &:before {
        content: "";
        position: absolute;
        width: 50px;
        height: 50px;
        border-radius: inherit;
        background: ${({ theme }) =>
            theme === "light"
                ? "linear-gradient(to right, #ffa000, #ac1900)"
                : "linear-gradient(to right, #484848, #000 )"};
    }
`;

const AppControlsContainer = () => {
    // Context section
    const { theme } = useContext(ThemeContext);
    const { onShowMusicListClick } = useContext(MusicListShowContext);
    const {
        musicIndex,
        onChangeMusic,
        playMode,
        onPlayModeClick,
        playPause,
        onPlayPauseClick,
    } = useContext(PlayingMusicContext);

    return (
        <ControllersDiv theme={theme}>
            {playMode === "shuffle" ? (
                <ShuffleRounded
                    onClick={() => onPlayModeClick()}
                    style={{
                        fontSize: "30px",
                        userSelect: "none",
                        cursor: "pointer",
                    }}
                />
            ) : null}
            {playMode === "repeat" ? (
                <RepeatRounded
                    onClick={() => onPlayModeClick()}
                    style={{
                        fontSize: "30px",
                        userSelect: "none",
                        cursor: "pointer",
                    }}
                />
            ) : null}

            {playMode === "repeatOne" ? (
                <RepeatOneRounded
                    onClick={() => onPlayModeClick()}
                    style={{
                        fontSize: "30px",
                        userSelect: "none",
                        cursor: "pointer",
                    }}
                />
            ) : null}
            <SkipPreviousRounded
                style={{
                    fontSize: "40px",
                    userSelect: "none",
                    cursor: "pointer",
                }}
                onClick={() => onChangeMusic("decrement", musicIndex)}
            />
            <PlayButtonDiv theme={theme} onClick={() => onPlayPauseClick()}>
                {playPause === "play" ? (
                    <PlayArrowRounded
                        style={{
                            zIndex: "10",
                            fontSize: "30px",
                            userSelect: "none",
                            cursor: "pointer",
                        }}
                    />
                ) : (
                    <PauseRounded
                        style={{
                            zIndex: "10",
                            fontSize: "30px",
                            userSelect: "none",
                            cursor: "pointer",
                        }}
                    />
                )}
            </PlayButtonDiv>
            <SkipNextRounded
                style={{
                    fontSize: "40px",
                    userSelect: "none",
                    cursor: "pointer",
                }}
                onClick={() => onChangeMusic("increment", musicIndex)}
            />
            <QueueMusic
                style={{
                    fontSize: "30px",
                    cursor: "pointer",
                    userSelect: "none",
                }}
                onClick={() => onShowMusicListClick()}
            />
        </ControllersDiv>
    );
};

export default AppControlsContainer;
