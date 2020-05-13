import React, { useState, createContext } from 'react';

export const StreamingContext = createContext();

export const StreamingInfoProvider = (props) => {
    const [isPlaying, setPlaying] = useState(false);
    const [currentSong, setSong] = useState(-1);
    const [previousSong, setPrevious] = useState(-1);
    const [mediaSource, setMediaSource] = useState(new MediaSource());
    const [audio, setAudio] = useState(document.createElement('audio'));

    return (
        <StreamingContext.Provider value={[isPlaying, setPlaying, currentSong, setSong, previousSong, setPrevious, mediaSource, setMediaSource, audio, setAudio]}>
            {props.children}
        </StreamingContext.Provider>
    );
}