import { createContext, useState, useRef, useEffect, useContext } from "react";
import { datas } from "../../datas/datas";

export const MiniContext = createContext();

export const MiniProvider = ({ children }) => {
    // State section
    const [mini, setMini] = useState("");

    // function the player to the mini mode
    const toggleMini = () => {
        setMini(mini === "" ? "none" : "");
    };

    return (
        <MiniContext.Provider value={{ mini, toggleMini }}>
            {children}
        </MiniContext.Provider>
    );
};

export const ImageShowContext = createContext();

export const ImageShowProvider = ({ children }) => {
    // Ref section
    const MusicImageContainerRef = useRef();

    // State section
    const [show, setShow] = useState("active");

    // function to toggle the audio cover image display
    const onShowMoreOrLessClick = () => {
        MusicImageContainerRef.current.classList.toggle(show);
    };

    return (
        <ImageShowContext.Provider
            value={{
                MusicImageContainerRef,
                onShowMoreOrLessClick,
                show,
                setShow,
            }}
        >
            {children}
        </ImageShowContext.Provider>
    );
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // State section
    const [theme, setTheme] = useState("light");

    // funtion to toggle the application theme
    const toggleTheme = () => {
        theme === "light" ? setTheme("dark") : setTheme("light");
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const MusicListShowContext = createContext();

export const MusicListShowProvider = ({ children }) => {
    // Ref section
    const MusicListShowRef = useRef();

    // function to display or hide the music list
    const onShowMusicListClick = () => {
        MusicListShowRef.current.classList.toggle("show");
    };

    return (
        <MusicListShowContext.Provider
            value={{ MusicListShowRef, onShowMusicListClick }}
        >
            {children}
        </MusicListShowContext.Provider>
    );
};

export const PlayingMusicContext = createContext();

export const PlayingMusicProvider = ({ children }) => {
    // States Section
    const [musicIndex, setMusicIndex] = useState(0);
    const [playMode, setPlayMode] = useState("shuffle");
    const [playPause, setPlayPause] = useState("play");

    // Context section
    const { musicAudioTagRef } = useContext(MusicRefContext);

    // Ref section
    const currentMusicTimeRef = useRef();
    const totalMusicDurationRef = useRef();

    // Effect section
    useEffect(() => {
        // to play automatically a music whenever the musicIndex changes
        if (playPause === "play") {
        } else {
            setPlayPause("pause");
            musicAudioTagRef.current.muted = false;
            musicAudioTagRef.current.play();
        }
    }, [musicAudioTagRef, musicIndex, playPause]);

    // ============== functions section ============= //

    // Determine the playing mode of the player
    const onPlayModeClick = () => {
        switch (playMode) {
            case "shuffle":
                setPlayMode("repeat");
                break;
            case "repeat":
                setPlayMode("repeatOne");
                break;
            case "repeatOne":
                setPlayMode("shuffle");
                break;
            default:
                break;
        }
    };

    // changing the music to the previous or the next
    const onChangeMusic = (action, musicIndex) => {
        switch (action) {
            case "increment":
                if (playPause === "play") {
                    console.log("Go on");
                    if (musicIndex === 8) {
                        setMusicIndex(0);
                    } else {
                        setMusicIndex(musicIndex + 1);
                    }
                } else {
                    if (musicIndex === 8) {
                        setMusicIndex(0);
                    } else {
                        setMusicIndex(musicIndex + 1);
                    }
                }
                break;
            case "decrement":
                if (playPause === "play") {
                    if (musicIndex === 0) {
                        setMusicIndex(8);
                    } else {
                        setMusicIndex(musicIndex - 1);
                    }
                } else {
                    if (musicIndex === 0) {
                        setMusicIndex(8);
                    } else {
                        setMusicIndex(musicIndex - 1);
                    }
                }
                break;
            default:
                throw new Error();
        }
    };

    // Put the music on play or pause mode
    const onPlayPauseClick = () => {
        if (playPause === "play") {
            setPlayPause("pause");
            musicAudioTagRef.current.play();
        } else {
            setPlayPause("play");
            musicAudioTagRef.current.pause();
        }
    };

    // This function will decide what to do when the audio ends depending on the playing mode
    const onAudioEnded = () => {
        if (playMode === "repeat") {
            setMusicIndex(musicIndex + 1);
        } else if (playMode === "repeatOne") {
            console.log("passed here");
            setMusicIndex(musicIndex);
            musicAudioTagRef.current.play();
        } else {
            setMusicIndex(Math.floor(Math.random() * datas.length + 1));
        }
    };

    // This will play automatically the choosen music when the music item is clicked
    const onMusicClick = (musicId) => {
        setPlayPause("pause");
        setMusicIndex(musicId);
    };

    return (
        <PlayingMusicContext.Provider
            value={{
                // state variables provide
                musicIndex,
                playPause,
                playMode,
                // Event functions provide
                onChangeMusic,
                onPlayModeClick,
                onPlayPauseClick,
                onAudioEnded,
                onMusicClick,
                setPlayMode,
                // Ref variables provide
                currentMusicTimeRef,
                totalMusicDurationRef,
            }}
        >
            {children}
        </PlayingMusicContext.Provider>
    );
};

export const MusicRefContext = createContext();

export const MusicRefProvider = ({ children }) => {
    // Ref section
    const musicAudioTagRef = useRef();

    return (
        <MusicRefContext.Provider value={{ musicAudioTagRef }}>
            {children}
        </MusicRefContext.Provider>
    );
};
