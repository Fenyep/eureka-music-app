import styled from "styled-components";
import {
    MusicRefContext,
    PlayingMusicContext,
    ThemeContext,
} from "../../utils/context";
import { useContext, useRef } from "react";
import { datas } from "../../datas/datas";

const MusicPlayerDiv = styled.div`
    height: 6px;
    width: 100%;
    background: #f0f0f0;
    border-radius: 50px;
    cursor: pointer;
`;

const MusicPlayerBarDiv = styled.div`
    position: relative;
    height: inherit;
    width: 0%;
    border-radius: inherit;
    background: ${({ theme }) =>
        theme === "light"
            ? "linear-gradient(to right, #ffa000, #ac1900);"
            : "linear-gradient(to right, #484848, #000);"}
    &:before {
        content: "";
        position: absolute;
        width: 12px;
        height: 12px;
        border-radius: inherit;
        top: 50%;
        right: -5px;
        transform: translateY(-50%);
        background: inherit;
        opacity: 0;
        transition: opacity 0.2 ease;
    }
    .progress-area:hover &:before {
        
        opacity: 1;
    }
`;

const AppPlayingArea = () => {
    // context section
    const { theme } = useContext(ThemeContext);
    const {
        playPause,
        musicIndex,
        onAudioEnded,
        currentMusicTimeRef,
        totalMusicDurationRef,
    } = useContext(PlayingMusicContext);
    const { musicAudioTagRef } = useContext(MusicRefContext);

    // Ref section
    const musicProgressBarRef = useRef();
    const musicProgressAreaRef = useRef();

    const audioLoadedData = (musicTotalDuration) => {
        // update total song duration
        let audioDuration = musicAudioTagRef.current.duration; // getting the music total duration
        let totalMin = Math.floor(audioDuration / 60); // calculating the music minutes number
        let totalSec = Math.floor(audioDuration % 60); // calculatiog the numbers of seconds left that are inferior to make 1min
        if (totalSec < 10) {
            // formating the music duration display in case totalSec less than 10
            totalSec = `0${totalSec}`;
        }
        // displaying the duration if available
        if (audioDuration) {
            musicTotalDuration.current.innerText = `0${totalMin}:${totalSec}`;
        } else {
            musicTotalDuration.current.innerText = "--:--";
        }
    };

    // =========== functions section ========== //

    // Updating the music progress bar with using the audio
    const onAudioTimeUpdate = (e) => {
        const currentTime = e.target.currentTime; // getting the audio current time
        const duration = e.target.duration; // getting the audio total duration
        // increasing the progress bar width if the audio is available
        if (currentTime && duration) {
            let progressWidth = (currentTime / duration) * 100;
            musicProgressBarRef.current.style.width = `${progressWidth}%`;
        } else {
            musicProgressBarRef.current.style.width = "0%";
        }
        // setting on the timer minutes display
        audioLoadedData(totalMusicDurationRef);

        // updating the playing song current time
        let currentMin = Math.floor(currentTime / 60); // calculating the audio current minute
        let currentSec = Math.floor(currentTime % 60); // calculating the audio current seconds inferior to 1min
        if (currentSec < 10) {
            // formating the music duration in case totalSec less than 10
            currentSec = `0${currentSec}`;
        }
        // displaying the current time if the audio is available
        if (currentTime && duration) {
            currentMusicTimeRef.current.innerText = `0${currentMin}:${currentSec}`;
        } else {
            currentMusicTimeRef.current.innerText = "--:--";
        }
    };

    // Here we will update the progressBar width on user click
    const onProgressAreaClick = (e) => {
        let progressAreaWidthVal = musicProgressAreaRef.current.clientWidth; // getting the current width of the progressArea
        let clickedOffSetX = e.nativeEvent.offsetX; // getting the coordinates of the mouse click in the progress area in the x-axis
        let songDuration = musicAudioTagRef.current.duration; // getting the music total duration
        musicAudioTagRef.current.currentTime =
            (clickedOffSetX / progressAreaWidthVal) * songDuration; // redifining the music current time based on the music position click
        if (playPause === "play") {
            // do no if the song is in pause
        } else {
            musicAudioTagRef.current.play(); // play the music if the song was on playing
        }
    };

    return (
        <MusicPlayerDiv
            className="progress-area"
            ref={musicProgressAreaRef}
            onClick={onProgressAreaClick}
        >
            <MusicPlayerBarDiv
                ref={musicProgressBarRef}
                theme={theme}
            ></MusicPlayerBarDiv>
            <audio
                src={datas[musicIndex].song}
                onEnded={() => onAudioEnded()}
                onTimeUpdate={onAudioTimeUpdate}
                ref={musicAudioTagRef}
                muted={false}
                autoPlay
            />
        </MusicPlayerDiv>
    );
};

export default AppPlayingArea;
