import { configureStore } from "@reduxjs/toolkit";
import gameReducer from './gameSlice';
import homeReducer from './features/Homepage/homeSlice';

export default configureStore({
  reducer: {
    game: gameReducer,
    home: homeReducer,
  },
});