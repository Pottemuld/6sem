import React, { useContext } from 'react';
import PreviousPic from '../assets/backward.png';
import { StreamingContext } from './StreamingContext';

function Previous() {
    const [isPlaying, setPlaying, currentSong, setSong, previousSong, setPrevious] = useContext(StreamingContext);

    function previous() {
        var temp = currentSong;
        
        setSong(previousSong);
        setPrevious(currentSong);
    }

    return (
        <img src={PreviousPic} onClick={previous} height="50vh" width="40vh" alt="previous_button" />
    );
}

export default Previous;