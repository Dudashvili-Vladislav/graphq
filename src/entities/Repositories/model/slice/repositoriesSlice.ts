import { ApolloError } from '@apollo/client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RepositoriesSchema, Repository } from '../types/repositories';


const initialState: RepositoriesSchema = {
    data: [],
    loading: false,
};

export const repositoriesSlice = createSlice({
    name: 'repositories',
    initialState,
    reducers: {
        setRepositories: (state, action:PayloadAction<Repository[]>) => {
            state.data = action.payload
            state.error = undefined
            state.loading = false
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        setError: (state, action: PayloadAction<ApolloError | undefined>) => {
            state.error = action.payload
        }
    },
});

// Action creators are generated for each case reducer function
export const { actions: repositoriesAction } = repositoriesSlice;
export const { reducer: repositoriesReducer } = repositoriesSlice;
