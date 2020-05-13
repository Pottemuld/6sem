export const addSongid = (n) => {
    return {
        type: 'ADD_SONGID',
        payload: n
    }
}

export const addTitle = (newtitle) => {
    return {
        type: 'ADD_TITLE',
        payload: newtitle
    }
}

export const addSongDur = (n) => {
    return {
        type: 'ADD_SONGDUR',
        payload: n
    }
}

export const addSong_url = (n) => {
    return {
        type: 'ADD_SONGURL',
        payload: n
    }
}

export const addSize = (n) => {
    return {
        type: 'ADD_SIZE',
        payload: n
    }
}

export const addAlbum = (n) => {
    return {
        type: 'ADD_ALBUM',
        payload: n
    }
}

export const addArt = (n) => {
    return {
        type: 'ADD_ART',
        payload: n
    }
}

export const addArtist = (n) => {
    return {
        type: 'ADD_ARTIST',
        payload: n
    }
}

export const logIn = (n) => {
    return {
        type: "LOG_IN",
        payload: n
    }
}

export const logOut = () => {
    return {
        type: "LOG_OUT"
    }
}

// currently unused
export const startPlaying = () => {
    return {
        type: "START_PLAYING"
    }
}

// currently unused
export const stopPlaying = () => {
    return {
        type: "STOP_PLAYING"
    }
}

// currently unused
export const startLoading = () => {
    return {
        type: "START_LOADING"
    }
}

// currently unused
export const stopLoading = () => {
    return {
        type: "STOP_LOADING"
    }
}

// currently unused
export const newSong = () => {
    return {
        type: "NEW_SONG"
    }
}

// currently unused
export const pause = () => {
    return {
        type: "PAUSED"
    }
}