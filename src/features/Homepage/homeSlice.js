import { createSlice } from '@reduxjs/toolkit';

export const homeSlice = createSlice({
    name: 'home',
    initialState: {
        lettersExploded: [],
        flipped: false,
    },
    reducers: {
        explodeLetter: (state, action) => {
            state.lettersExploded.push(action.payload);
        },
        flipLetters: (state, action) => {
            if (action.payload !== undefined) {
                state.flipped = action.payload;
            } else {
                state.flipped = !state.flipped;
            }
        }
    },
});

export const lettersExploded = (state) => state.home.lettersExploded;
export const flipped = (state) => state.home.flipped;
export const { explodeLetter, flipLetters } = homeSlice.actions;
export default homeSlice.reducer;