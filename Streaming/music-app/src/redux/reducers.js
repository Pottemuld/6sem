function clone (src) {
    return JSON.parse(JSON.stringify(src));
}


export const songids = (state = [], action) => {
    switch(action.type) {
        case "ADD_SONGID":
            state.push(action.payload);
            return clone(state);
        default:
            return state;
    }
}

export const titles = (state = [], action) => {
    switch (action.type) {
        case "ADD_TITLE":
            state.push(action.payload);
            return clone(state);           // returns a new array reference with same elements - if reference doesnt change, components dont update
        default:
            return state;
    }
}

export const songDurations = (state = [], action) => {
    switch (action.type) {
        case "ADD_SONGDUR":
            state.push(action.payload);
            return clone(state);
        default:
            return state;
    }
}

export const song_urls = (state = [], action) => {
    switch (action.type) {
        case "ADD_SONGURL":
            state.push(action.payload);
            return clone(state);
        default:
            return state;
    }
}

export const sizes = (state = [], action) => {
    switch (action.type) {
        case "ADD_SIZE":
            state.push(action.payload);
            return clone(state);
        default:
            return state;
    }
}

export const albums = (state = [], action) => {
    switch (action.type) {
        case "ADD_ALBUM":
            state.push(action.payload);
            return clone(state);
        default:
            return state;
    }
}

export const arts = (state = [], action) => {
    switch (action.type) {
        case "ADD_ART":
            state.push(action.payload);
            return clone(state);
        default:
            return state;
    }
}

export const artists = (state = [], action) => {
    switch (action.type) {
        case "ADD_ARTIST":
            state.push(action.payload);
            return clone(state);
        default:
            return state;
    }
}

export const loggedID = (state = -1, action) => {
    switch (action.type) {
        case "LOG_IN":
            return state = action.payload;
        case "LOG_OUT":
            return state = -1;
        default:
            return state;
    }
}

// currently unused
export const isPlaying = (state = false, action) => {
    switch (action.type) {
        case "START_PLAYING":
            return state = true;
        case "STOP_PLAYING":
            return state = false;
        default:
            return state;
    }
}

// currently unused
export const isLoading = (state = false, action) => {
    switch (action.type) {
        case "START_LOADING":
            return state = true;
        case "STOP_LOADING":
            return state = false;
        default:
            return state;
    }
}

// currently unused
export const hasBeenPaused = (state = false, action) => {
    switch (action.type) {
        case "NEW_SONG":
            return state = false;
        case "PAUSED":
            return state = true;
        default:
            return state;
    }
}