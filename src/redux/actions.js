export const REQUEST_TOP_ARTISTS = 'REQUEST_TOP_ARTISTS';
export const requestTopArtists = () => ({type: REQUEST_TOP_ARTISTS});

export const RECEIVE_TOP_ARTISTS = 'RECEIVE_TOP_ARTISTS';
export const receiveTopArtists = topArtists => ({type: RECEIVE_TOP_ARTISTS, payload: topArtists});

export const REQUEST_RECOMMENDATIONS = 'REQUEST_RECOMMENDATIONS';
export const requestRecommendations = () => ({type: REQUEST_RECOMMENDATIONS});

export const RECEIVE_RECOMMENDATIONS = 'RECEIVE_RECOMMENDATIONS';
export const receiveRecommendations = recommendations => ({type: RECEIVE_RECOMMENDATIONS, payload: recommendations});