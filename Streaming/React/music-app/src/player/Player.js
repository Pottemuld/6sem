import React, { useContext, useEffect } from 'react';
import PlayPause from './PlayPause';
import Previous from './Previous';
import Skip from './Skip';
import { useSelector } from 'react-redux';
import { StreamingContext } from './StreamingContext';
import { MUSIC_SERVER } from '../env_vars.js';

function Player() {
    const [isPlaying, setPlaying, currentSong, setSong, duration, setDuration, isLoading, setLoading] = useContext(StreamingContext);

    // for finding data about the current song
    const songids = useSelector(state => state.songids);
    const index = songids.indexOf(currentSong);
    const title = useSelector(state => state.titles[index]);
    const art = useSelector(state => state.arts[index]);
    const song_url = useSelector(state => state.song_urls[index]);
    const size = useSelector(state => state.sizes[index]);

    // setup audio
    const audio = document.createElement('audio');

    useEffect(() => {
        if (currentSong != -1) {

            var mediaSource = new MediaSource();
            audio.src = URL.createObjectURL(mediaSource);
            var audioSourceBuffer;
            mediaSource.addEventListener('sourceopen', function () {
                console.log("Mediasource has indicated that it is open!");
                if (mediaSource.sourceBuffers[0] == null) {
                    audioSourceBuffer = mediaSource.addSourceBuffer('audio/mpeg');
                    console.log("mediaSource has added a new audiosourcebuffer! " + mediaSource.readyState);
                }
            });

            console.log("Created new mediasource! Containing these sourcebuffers: ");
            console.log(mediaSource.sourceBuffers);

            setLoading(true);   // we start loading

            // if there is already a song loading/playing, remove that sourcebuffer.
            if (mediaSource.activeSourceBuffers[0] != null) {
                console.log("Removing current audiosourcebuffer to start new song");
                mediaSource.removeSourceBuffer(mediaSource.activeSourceBuffers[0]);     // removes sourcebuffer from list, but if it still exists it's a problem - still holding the data?
            }

            // determine number of segments
            const totalSegments = size / 200000;    // segments of 200 kb each
            console.log("There will be " + totalSegments + " total segments.");

            // add a sourcebuffer for the new song
            //const audioSourceBuffer = mediaSource.addSourceBuffer('audio/mpeg');    // maybe need codecs

            // we should always expect to receive one not-full segment, meaning we always round up, or take 1 extra segment.
            console.log("Now fetching the first segment of song: " + title);
            var seg = 1;
            fetch(`${MUSIC_SERVER}/playSong?song=${song_url}&segment=${seg}`)
                .then(function (resp) {
                    return resp.arrayBuffer();
                })
                .then(function (audioSegment) {
                    audioSourceBuffer.appendBuffer(audioSegment);       // !! NULLPOINTER WARNING !! -- audiosourcebuffer might be null if we are still loading previous song

                    console.log("Received segment " + seg);
                    console.log("Begin playing!");
                    audio.play();   // when we have received the first segment, start playing

                    // listening for updates to sourcebuffer, to load next segments continuously
                    audio.addEventListener('progress', function () {
                        console.log("We have received an onupdate event!");
                        seg++;

                        fetch(`${MUSIC_SERVER}/playSong?song=${song_url}&segment=${seg}`)
                            .then(function (resp) {
                                return resp.arrayBuffer();
                            })
                            .then(function (audioSegment) {
                                audioSourceBuffer.appendBuffer(audioSegment);
                                console.log("Received this: " + audioSegment + " as segment " + seg);

                                if (seg == totalSegments + 1) {     // if we have reached the final segment, we are done loading
                                    setLoading(false);
                                }
                            });
                    });
                    console.log("Added eventListener!");
                });
        }
    }, [currentSong])


    return (
        <div className="wrapper">
            <div className="albumart">
                <img src={currentSong > 0 ? art : ""} height="75vh" />
            </div>
            <div className="player">
                <Previous />
                <PlayPause />
                <Skip />
            </div>
            <div className="songdisplay">
                <h4>{title}</h4>
            </div>
        </div>
    );
}


export default Player;