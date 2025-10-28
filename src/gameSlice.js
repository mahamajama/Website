import { createSlice } from '@reduxjs/toolkit';

export const gameSlice = createSlice({
    name: 'game',
    initialState: {
        isDebugMode: false,
        flags: [],
        inventory: {},
    },
    reducers: {
        setIsDebugMode: (state, action) => {
            state.isDebugMode = action.payload;
        },
        setFlag: (state, action) => {
            state.flags.push(action.payload);
        },
        addToInventory: (state, action) => {
            state.inventory[action.payload] = action.payload;
        },
    },
});

export const isDebugMode = (state) => state.game.isDebugMode;
export const selectFlags = (state) => state.game.flags;
export const selectInventory = (state) => state.game.inventory;
export const { setIsDebugMode, setFlag, addToInventory } = gameSlice.actions;
export default gameSlice.reducer;