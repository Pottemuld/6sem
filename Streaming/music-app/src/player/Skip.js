import React, { useContext } from 'react';
import SkipPic from '../assets/forward.png';
import { StreamingContext } from './StreamingContext';
import { useSelector } from 'react-redux';


function Skip() {
    const [isPlaying, setPlaying, currentSong, setSong, previousSong, setPrevious] = useContext(StreamingContext);
    const songids = useSelector(state => state.songids);

    function skip() {
        setPrevious(currentSong);
        var next = (parseInt(currentSong) % songids.length) + 1;
        setSong(next.toString());
    }

    return (
        <img src={SkipPic} onClick={skip} height="50vh" width="40vh" alt="skip_button" />
    );
}

export default Skip;