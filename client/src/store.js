import { configureStore } from "@reduxjs/toolkit";

import gameReducer from './gameSlice';
import homeReducer from './features/Home/homeSlice';
import windowsReducer from './components/Windows/windowsSlice';
import audioReducer from './features/Audio/audioSlice';
import ludozoneReducer from './features/Ludozone/ludozoneSlice';

const store = configureStore({
  reducer: {
    game: gameReducer,
    home: homeReducer,
    windows: windowsReducer,
    audio: audioReducer,
    ludozone: ludozoneReducer,
  },
});

export default store;