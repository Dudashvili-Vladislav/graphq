import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const defaultValue = localStorage.getItem("search") || ''

const initialState = {
    search: defaultValue,
};

export const searchSlice = createSlice({
    name: 'search_repositories',
    initialState,
    reducers: {
        setSearch: (state, action:PayloadAction<string>) => {
            state.search = action.payload
        }
    },
});

// Action creators are generated for each case reducer function
export const { actions: searchActions } = searchSlice;
export const { reducer: searchReducer } = searchSlice;
