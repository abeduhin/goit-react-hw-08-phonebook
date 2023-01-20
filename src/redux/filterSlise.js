import { createSlice } from "@reduxjs/toolkit";

const filterSlise = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        filterGange(state, action) {
            console.log(action)
            return action.payload;            
        }
    }    
})
    
export const { filterGange } = filterSlise.actions;
export const filterReducer = filterSlise.reducer;