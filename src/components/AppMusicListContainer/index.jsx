import styled from "styled-components";
import { QueueMusic, CloseRounded } from "@material-ui/icons";
import {
    MiniContext,
    MusicListShowContext,
    PlayingMusicContext,
    ThemeContext,
} from "../../utils/context";
import { useContext } from "react";
import { datas } from "../../datas/datas";

const MusicListDiv = styled.div`
    position: absolute;
    width: inherit;
    max-height: 200px;
    padding: 15px 20px;
    z-index: 8;
    left: 0;
    bottom: -55%;
    opacity: 1;
    bottom: -10%;
    overflow: scroll;
    &::-webkit-scrollbar {
        width: 0px;
        background: transparent;
    }
    border-top: ${({ theme }) =>
        theme === "light" ? "none" : "2px solid #fff"};
    color: ${({ theme }) => (theme === "light" ? "#000;" : "#fff;")}
    background:  ${({ theme }) => (theme === "light" ? "#efefef" : "#000a12")};
    border-radius: 30px;
    transform: ${({ mini }) =>
        mini === "" ? "translateY(70%)" : "translateY(85%)"};
    transition: all 500ms ease;
    &.show {
        bottom: ${({ mini }) => (mini === "" ? "20%" : "45%")};
        z-index: 12;
        opacity: ${({ theme }) => (theme === "light" ? "0.9" : "0.9")};
    }
`;

const MusicListHeader = styled.header`
    position: relative;
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 21px;
`;

const MusicItemDiv = styled.div`
    position: relative;
    width: 100%;
    height: auto;
    ${({ musicIndex, musicId, theme }) =>
        musicIndex === musicId
            ? theme === "light"
                ? "border-right: 4px solid #000;"
                : "border-right: 4px solid #fff;"
            : ""}
    &:hover {
        cursor: pointer;
    }
`;

const MusicItemInfosDiv = styled.div`
    position: relative;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const MusicAuthorTitleSpan = styled.span`
    position: relative;
    display: flex;
    flex-direction: column;
`;

const AppMusicListContainer = () => {
    // context section
    const { MusicListShowRef, onShowMusicListClick } =
        useContext(MusicListShowContext);
    const { mini } = useContext(MiniContext);
    const { onMusicClick, musicIndex } = useContext(PlayingMusicContext);
    const { theme } = useContext(ThemeContext);

    return (
        <MusicListDiv mini={mini} ref={MusicListShowRef} theme={theme}>
            <MusicListHeader>
                <QueueMusic />
                <span>Music list</span>
                <CloseRounded
                    onClick={() => onShowMusicListClick()}
                    style={{ cursor: "pointer" }}
                />
            </MusicListHeader>

            {datas && datas.length > 0
                ? datas.map((data) => (
                      <MusicItemDiv
                          musicId={data.id - 1}
                          musicIndex={musicIndex}
                          theme={theme}
                          key={data.id}
                          onClick={() => onMusicClick(data.id - 1)}
                      >
                          <div
                              style={{
                                  display: "block",
                                  width: "100%",
                                  height: "2px",
                                  background: `${
                                      theme === "light" ? "#000" : "#fff"
                                  }`,
                                  opacity: "0.3",
                              }}
                          ></div>
                          <div>
                              <MusicItemInfosDiv>
                                  <MusicAuthorTitleSpan>
                                      <span>{data.title}</span>
                                      <span>{data.author}</span>
                                  </MusicAuthorTitleSpan>
                                  <span>03:55</span>
                              </MusicItemInfosDiv>
                          </div>
                      </MusicItemDiv>
                  ))
                : null}
        </MusicListDiv>
    );
};

export default AppMusicListContainer;
