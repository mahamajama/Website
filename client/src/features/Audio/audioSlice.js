import { createSlice } from '@reduxjs/toolkit';

import { clamp } from '../../utils/helpers';
import { audioParent, updateMasterVolume } from './audio';

export const audioSlice = createSlice({
    name: 'audio',
    initialState: {
        masterVolume: 0.4,
    },
    reducers: {
        setMasterVolume: (state, action) => {
            const newVolume = clamp(action.payload, 0, 1);
            state.volume = newVolume;
            updateMasterVolume(newVolume);
        },
    },
});

export const selectMasterVolume = (state) => state.audio.masterVolume;
export const { setMasterVolume } = audioSlice.actions;
export default audioSlice.reducer;