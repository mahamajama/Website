import { createSlice } from '@reduxjs/toolkit';

export const windowsSlice = createSlice({
    name: 'windows',
    initialState: {
        windows: [],
        focused: null,
    },
    reducers: {
        openWindow: (state, action) => {
            const newWindow = action.payload;
            const currentWindow = state.windows.find(window => window.id === newWindow.id);
            if (currentWindow) {
                currentWindow.closed = false;
            } else {
                state.windows.push(newWindow);
                //console.log(`New window: ${newWindow.id}`);
            }
            state.focused = newWindow.id;
            //console.log(`Focused window: ${newWindow.id}`);
        },
        closeWindow: (state, action) => {
            const currentWindow = state.windows.find(window => window.id === action.payload);
            if (currentWindow && currentWindow.persistent) {
                currentWindow.closed = true;
            } else {
                state.windows = state.windows.filter(window => window.id !== action.payload);
            }
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