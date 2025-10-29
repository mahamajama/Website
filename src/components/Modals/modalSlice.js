import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
    name: 'modals',
    initialState: {
        modals: [],
        focused: null,
    },
    reducers: {
        createModal: (state, action) => {
            state.modals.push(action.payload);
            state.focused = action.payload.id;
        },
        closeModal: (state, action) => {
            state.modals = state.modals.filter(modal => modal.id !== action.payload);
        },
        setFocused: (state, action) => {
            state.focused = action.payload;
        }
    },
});

export const selectModals = (state) => state.modals.modals;
export const selectFocused = (state) => state.modals.focused;
export const { createModal, closeModal, setFocused } = modalSlice.actions;
export default modalSlice.reducer;