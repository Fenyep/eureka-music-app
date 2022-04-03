import React from "react";
import ReactDOM from "react-dom";
import AppContainer from "./components/AppContainer";
import AppControlsContainer from "./components/AppControlsContainer";
import AppHeader from "./components/AppHeader";
import AppImageContainer from "./components/AppImageContainer";
import AppMusicInfos from "./components/AppMusicInfos";
import AppPlayingArea from "./components/AppPlayingArea";
import AppMusicListContainer from "./components/AppMusicListContainer";
import AppMusicTimer from "./components/AppMusicTimer";
import Globalstyle from "./utils/styles/GlobalStyles";
import {
    MiniProvider,
    ImageShowProvider,
    ThemeProvider,
    MusicListShowProvider,
    PlayingMusicProvider,
    MusicRefProvider,
} from "./utils/context";

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider>
            <MusicRefProvider>
                <MusicListShowProvider>
                    <PlayingMusicProvider>
                        <MiniProvider>
                            <ImageShowProvider>
                                <Globalstyle />
                                <AppContainer>
                                    <AppHeader />
                                    <AppImageContainer />
                                    <AppMusicInfos />
                                    <AppMusicTimer />
                                    <AppPlayingArea />
                                    <AppControlsContainer />
                                    <AppMusicListContainer />
                                </AppContainer>
                            </ImageShowProvider>
                        </MiniProvider>
                    </PlayingMusicProvider>
                </MusicListShowProvider>
            </MusicRefProvider>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
