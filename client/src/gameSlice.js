import { createSlice } from '@reduxjs/toolkit';

export const gameSlice = createSlice({
    name: 'game',
    initialState: {
        isDebugMode: false,
        isPortfolio: true,
        flags: [],
        inventory: [],
        equipped: null,
        menuIsOpen: false,
        notification: null,
        cover: null,
    },
    reducers: {
        setIsDebugMode: (state, action) => {
            state.isDebugMode = action.payload;
        },
        setIsPortfolio: (state, action) => {
            state.isPortfolio = action.payload;
        },
        setFlag: (state, action) => {
            state.flags.push(action.payload);
        },
        addToInventory: (state, action) => {
            state.inventory.push(action.payload);
            state.notification = `<item>${action.payload.displayName}</item> has been added to your inventory`;
        },
        updateItem: (state, action) => {
            const index = state.inventory.findIndex(item => item.name === action.payload.name);
            if (index > -1) {
                const newInventory = [...state.inventory];
                newInventory[index] = action.payload;
                state.inventory = newInventory;
            } 
        },
        setEquipped: (state, action) => {
            state.equipped = action.payload;
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
        description: 'A large nut. It looks like a chestnut.',
    },
    ornateBox: {
        name: 'ornateBox',
        displayName: 'Ornate Box',
        icon: 'images/items/ornateBox.png',
        fullImage: 'images/items/ornateBox_full.png',
        description: 'A finely crafted box with a combination lock built into the front.',
    },
}

export const selectIsDebugMode = (state) => state.game.isDebugMode;
export const selectIsPortfolio = (state) => state.game.isPortfolio;
export const selectFlags = (state) => state.game.flags;
export const selectInventory = (state) => state.game.inventory;
export const selectEquipped = (state) => state.game.equipped;
export const selectMenuIsOpen = (state) => state.game.menuIsOpen;
export const selectNotification = (state) => state.game.notification;
export const { setIsDebugMode, setIsPortfolio, setFlag, addToInventory, updateItem, setEquipped, setMenuIsOpen, setNotification } = gameSlice.actions;
export default gameSlice.reducer;