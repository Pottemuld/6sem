import React, { useContext } from 'react'
import { useSelector } from 'react-redux';
import { StreamingContext } from '../../player/StreamingContext.js';


/* for displaying the cards with info about each song, to be shown in an overview list */
function SingleSong(props) {
    const [isPlaying, setPlaying, currentSong, setSong, previousSong, setPrevious] = useContext(StreamingContext);

    const songid = useSelector(state => state.songids[props.val]);
    const art = useSelector(state => state.arts[props.val]);
    const artist = useSelector(state => state.artists[props.val]);
    const album = useSelector(state => state.albums[props.val]);
    const title = useSelector(state => state.titles[props.val]);
    const songDuration = useSelector(state => state.songDurations[props.val]);

    function selectSong() {
        setPrevious(currentSong);
        setSong(songid);
        setPlaying(true);
    }

    return (
        <a onClick={selectSong}>
            <div className="songCard">
                <img height="4%" width="4%" src={art} alt="missing"></img>     {/* vi tænker at bruge en url til der hvor vi har en db til at hoste billeder */}

                <p>
                    {artist}
                </p>
                <p>
                    {title}
                </p>
                <p>
                    {album}
                </p>
                <p>
                    {songDuration} sec
            </p>

            </div>
        </a>
    );
}

export default SingleSong;