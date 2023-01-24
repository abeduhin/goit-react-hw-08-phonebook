import { combineReducers } from '@reduxjs/toolkit';
import contactsAPIReducer from './contactsAPI/contactsAPISlice';
// import contactsReducer from './contactsSlice';
import { filterReducer } from './filterSlice';

export const rootReducer = combineReducers ({
  // contacts: contactsReducer,
  contacts: contactsAPIReducer,
  filter: filterReducer,
  

});