import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        filterGange(state, action) {
            console.log(action)
            return action.payload;            
        }
    }    
})
    
export const { filterGange } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;