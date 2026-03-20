import { createSlice } from '@reduxjs/toolkit';

export const windowsSlice = createSlice({
    name: 'windows',
    initialState: {
        windows: [],
        focused: null,
    },
    reducers: {
        openWindow: (state, action) => {
            state.windows.push(action.payload);
            state.focused = action.payload.id;
        },
        closeWindow: (state, action) => {
            state.windows = state.windows.filter(window => window.id !== action.payload);
        },
        setFocused: (state, action) => {
            state.focused = action.payload;
        }
    },
});

export const selectWindows = (state) => state.windows.windows;
export const selectFocused = (state) => state.windows.focused;
export const { openWindow, closeWindow, setFocused } = windowsSlice.actions;
export default windowsSlice.reducer;