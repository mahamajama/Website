import { createSlice } from '@reduxjs/toolkit';

export const homeSlice = createSlice({
    name: 'home',
    initialState: {
        lettersExploded: [],
    },
    reducers: {
        explodeLetter: (state, action) => {
            state.lettersExploded.push(action.payload);
        },
    },
});

export const lettersExploded = (state) => state.home.lettersExploded;
export const { explodeLetter } = homeSlice.actions;
export default homeSlice.reducer;