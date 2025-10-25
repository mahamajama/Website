import { createSlice } from '@reduxjs/toolkit';

export const gameSlice = createSlice({
    name: 'game',
    initialState: {
        isDebugMode: false,
        
    },
    reducers: {
        setIsDebugMode: (state, action) => {
            state.isDebugMode = action.payload;
        },
    },
});

export const isDebugMode = (state) => state.game.isDebugMode;
export const { setIsDebugMode } = gameSlice.actions;
export default gameSlice.reducer;