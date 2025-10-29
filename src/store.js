import { configureStore } from "@reduxjs/toolkit";
import gameReducer from './gameSlice';
import homeReducer from './features/Homepage/homeSlice';
import modalReducer from './components/Modals/modalSlice';

export default configureStore({
  reducer: {
    game: gameReducer,
    home: homeReducer,
    modals: modalReducer,
  },
});