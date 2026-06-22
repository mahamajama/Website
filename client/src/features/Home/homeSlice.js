import { createSlice } from '@reduxjs/toolkit';

export const homeSlice = createSlice({
    name: 'home',
    initialState: {
        jColor: '#FFFFFF',
        o1Exploded: false,
        o2Exploded: false,
        flipped: false,
        sPosition: { x: 0, y: 0 },
    },
    reducers: {
        setJColor: (state, action) => {
            state.jColor = action.payload;
        },
        explodeO1: (state, action) => {
            state.o1Exploded = true;
        },
        explodeO2: (state, action) => {
            state.o2Exploded = true;
        },
        flipLetters: (state, action) => {
            if (action.payload !== undefined) {
                state.flipped = action.payload;
            } else {
                state.flipped = !state.flipped;
            }
        },
        setSPosition: (state, action) => {
            state.sPosition = action.payload;
        },
    },
});

export const selectJColor = (state) => state.home.jColor;
export const selectO1Exploded = (state) => state.home.o1Exploded;
export const selectO2Exploded = (state) => state.home.o2Exploded;
export const selectFlipped = (state) => state.home.flipped;
export const selectSPosition = (state) => state.home.sPosition;
export const { setJColor, explodeO1, explodeO2, flipLetters, setSPosition } = homeSlice.actions;
export default homeSlice.reducer;