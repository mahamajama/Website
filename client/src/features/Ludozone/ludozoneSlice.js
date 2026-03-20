import { createSlice, createAsyncThunk, isPending, isFulfilled, isRejected } from '@reduxjs/toolkit';

import get from '../../utils/api';

const ludozonePath = `/api/games`

const sampleList = [
    {
        name: 'The Legend of Piss',
        completedMin: '2012-08-12',
        completedMax: '2012-08-12',
        released: '2010-04-23',
    },
    {
        name: 'The Legend of Piss 2: Poo',
        completedMin: '2012-08-12',
        completedMax: '2012-08-12',
        released: '2010-04-23',
    },
    {
        name: 'Cool Game 4',
        completedMin: '2011-02-04',
        completedMax: '2012-08-12',
        released: '1997-05-20',
    },
];

export const getList = createAsyncThunk(
    'ludozone/getList',
    async () => {
        const path = `${ludozonePath}`;
        try {
            const response = await get(path);
            return response;
        } catch(error) {
            throw error;;
        }
    }
);

export const ludozoneSlice = createSlice({
    name: 'ludozone',
    initialState: {
        list: [],
        isLoading: false,
        hasError: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getList.fulfilled, (state, action) => {
            state.list = action.payload;
            //console.log(action.payload);
        }),
        builder
            .addMatcher(
                isPending(getList), (state, action) => {
                    state.isLoading = true;
                    state.hasError = false;
                    console.log(action.type);
                }
            )
            .addMatcher(
                isFulfilled(getList), (state, action) => {
                    state.isLoading = false;
                    state.hasError = false;
                    console.log(action.type);
                    //console.log(action.payload);
                }
            )
            .addMatcher(
                isRejected(getList), (state, action) => {
                    state.isLoading = false;
                    state.hasError = true;
                    console.log(action.type);
                    console.log(action.error.message);
                }
            )
            .addDefaultCase(() => {})
    },
});

export const selectList = (state) => state.ludozone.list;
//export const {  } = ludozoneSlice.actions;
export default ludozoneSlice.reducer;