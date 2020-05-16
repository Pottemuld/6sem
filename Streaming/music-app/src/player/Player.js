import React, { useContext, useEffect } from 'react';
import PlayPause from './PlayPause';
import Previous from './Previous';
import Skip from './Skip';
import { useSelector } from 'react-redux';
import { StreamingContext } from './StreamingContext';
import { SERVER } from '../env_vars.js';

function Player() {
    const [isPlaying, setPlaying, currentSong, setSong, previousSong, setPrevious, mediaSource, setMediaSource, audio, setAudio] = useContext(StreamingContext);

    // for finding data about the current song:
    const songids = useSelector(state => state.songids);
    const index = songids.indexOf(currentSong);
    const title = useSelector(state => state.titles[index]);
    const art = useSelector(state => state.arts[index]);
    const song_url = useSelector(state => state.song_urls[index]);
    const size = useSelector(state => state.sizes[index]);
    const duration = useSelector(state => state.songDurations[index]);


    useEffect(() => {
        if (currentSong > 0) {
            console.log("Playing " + title + ", id: " + currentSong);
            setMediaSource(new MediaSource());

            audio.src = URL.createObjectURL(mediaSource);

            var audioSourceBuffer;
            mediaSource.addEventListener('sourceopen', function () {
                if (mediaSource.sourceBuffers[0] == null) {
                    audioSourceBuffer = mediaSource.addSourceBuffer('audio/mpeg');
                }
            });

            var isLoading = true;   // we start loading

            // determine number of segments
            var totalSegments = size / 200000;    // segments of 200 kb each
            var seg = 0;

            // we should always expect to receive one not-full segment
            fetch(`${SERVER}/playSong?song=${song_url}&segment=${seg}`)
                .then(function (resp) {
                    return resp.arrayBuffer();
                })
                .then(function (audioSegment) {
                    audioSourceBuffer.appendBuffer(audioSegment);

                    console.log("Received segment " + seg);
                    audio.play();   // when we have received the first segment, start playing
                    setPlaying(true);

                    seg++;
                    fetch(`${SERVER}/playSong?song=${song_url}&segment=${seg}`)
                        .then(function (resp) {
                            return resp.arrayBuffer();
                        })
                        .then(function (audioSegment) {
                            audioSourceBuffer.appendBuffer(audioSegment);
                            console.log("Received segment " + seg);


                            // loading two additional initial segments because metadata can be a lot
                            seg++;
                            fetch(`${SERVER}/playSong?song=${song_url}&segment=${seg}`)
                                .then(function (resp) {
                                    return resp.arrayBuffer();
                                })
                                .then(function (audioSegment) {
                                    audioSourceBuffer.appendBuffer(audioSegment);
                                    console.log("Received segment " + seg);

                                    seg++;
                                    fetch(`${SERVER}/playSong?song=${song_url}&segment=${seg}`)
                                        .then(function (resp) {
                                            return resp.arrayBuffer();
                                        })
                                        .then(function (audioSegment) {
                                            audioSourceBuffer.appendBuffer(audioSegment);
                                            console.log("Received segment " + seg);
                                        });
                                });
                        });
                });

            // listening for updates, to load next segments continuously
            audio.ontimeupdate = function (event) {
                if (isLoading && Math.round(audio.currentTime % 2) == 0) {
                    seg++;

                    fetch(`${SERVER}/playSong?song=${song_url}&segment=${seg}`)
                        .then(function (resp) {
                            return resp.arrayBuffer();
                        })
                        .then(function (audioSegment) {
                            audioSourceBuffer.appendBuffer(audioSegment);
                            console.log("Received segment " + seg);

                            if (seg == Math.floor(totalSegments)) {     // if we have reached the final segment, we are done loading
                                console.log("Done loading!");
                                isLoading = false;
                            }
                        });
                } else if (audio.currentTime > (duration - 0.5)) {
                    console.log("Done listening!");
                    var next = (parseInt(currentSong) % songids.length) + 1;
                    setSong(next.toString());
                }
            };
        }
    }, [currentSong])


    return (
        <div className="wrapper">
            <div className="albumart">
                <img src={currentSong > -1 ? art : ""} height="75vh" />
            </div>
            <div className="player">
                <Previous />
                <PlayPause audio={audio} />
                <Skip />
            </div>
            <div className="songdisplay">
                <h4>{title}</h4>
            </div>
        </div>
    );
}


export default Player;