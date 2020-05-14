import React from 'react';
import SingleSong from './SingleSong';
import { useSelector } from 'react-redux';

function SongOverview() {
    const songids = useSelector(state => state.songids);

    const newSongcards = songids.map((id, index) => (<SingleSong key={id} val={index}/>));

    return (
        <div>
            {newSongcards}
        </div>
    );
}

export default SongOverview;