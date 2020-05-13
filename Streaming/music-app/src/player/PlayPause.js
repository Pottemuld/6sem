import React, { useContext } from 'react';
import PlayPic from '../assets/play.png';
import PausePic from '../assets/pause.png';
import { StreamingContext } from './StreamingContext';


function PlayPause() {
    const [isPlaying, setPlaying, currentSong, setSong, previousSong, setPrevious, mediaSource, setMediaSource, audio, setAudio] = useContext(StreamingContext);

    async function playPauseClicked() {
        if (currentSong > 0) {
            setPlaying(!isPlaying);

            if (audio.paused) {
                audio.play();
                setPlaying(true);
            } else {
                audio.pause()
                setPlaying(false);
            }
        }
    }


    // isPlaying ? isLoading ? PausePicGrey : PausePic : PlayPic
    return (
        <div className="playPause">
            <img src={isPlaying ? PausePic : PlayPic} height="50vh" width="40vh" onClick={playPauseClicked} alt="placeholder_text" />
        </div>
    );

}

export default PlayPause;