import { createSlice } from '@reduxjs/toolkit';

export const homeSlice = createSlice({
    name: 'home',
    initialState: {
        o2Exploded: false,
        flipped: false,
    },
    reducers: {
        explodeO2: (state, action) => {
            state.o2Exploded = true;
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

export const selectO2Exploded = (state) => state.home.o2Exploded;
export const selectFlipped = (state) => state.home.flipped;
export const { explodeO2, flipLetters } = homeSlice.actions;
export default homeSlice.reducer;