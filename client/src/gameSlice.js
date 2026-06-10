import { createSlice } from '@reduxjs/toolkit';

export const gameSlice = createSlice({
    name: 'game',
    initialState: {
        isDebugMode: false,
        flags: [],
        inventory: [],
        menuIsOpen: false,
        notification: null,
        cover: null,
    },
    reducers: {
        setIsDebugMode: (state, action) => {
            state.isDebugMode = action.payload;
        },
        setFlag: (state, action) => {
            state.flags.push(action.payload);
        },
        addToInventory: (state, action) => {
            state.inventory.push(action.payload);
            state.notification = `<item>${action.payload.displayName}</item> has been added to your inventory`;
        },
        setMenuIsOpen: (state, action) => {
            state.menuIsOpen = action.payload;
        },
        setNotification: (state, action) => {
            state.notification = action.payload;
        },
        setCover: (state, action) => {
            state.cover = action.payload;
        },
    },
});

export const allItems = {
    nut: {
        name: 'nut',
        displayName: 'Nut',
        icon: 'images/items/nut.png',
        fullImage: 'images/items/nut_full.png',
        description: 'A large nut. It looks similar to a walnut.',
    },
    ornateBox: {
        name: 'ornateBox',
        displayName: 'Ornate Box',
        icon: 'images/items/ornateBox.png',
        fullImage: 'images/items/ornateBox_full.png',
        description: 'A finely crafted box with a combination lock built into the front.',
    },
}

export const isDebugMode = (state) => state.game.isDebugMode;
export const selectFlags = (state) => state.game.flags;
export const selectInventory = (state) => state.game.inventory;
export const selectMenuIsOpen = (state) => state.game.menuIsOpen;
export const selectNotification = (state) => state.game.notification;
export const { setIsDebugMode, setFlag, addToInventory, setMenuIsOpen, setNotification } = gameSlice.actions;
export default gameSlice.reducer;