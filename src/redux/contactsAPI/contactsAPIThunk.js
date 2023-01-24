import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const contactsAPI = axios.create({
    // Axios.create функція в Axios, яка використовується для створення нового екземпляра з конфігурацією користувача
    baseURL: 'https://63cc5d1a5c6f2e1d84c5c3e8.mockapi.io/contacts'
});

export const fetchContacts = createAsyncThunk('contacts/fetchAll',
    // Функція createAsyncThunk() автоматично створює екшени(оголошення асинхронних генераторів екшенів), що представляють життєвий цикл HTTP-запиту, і відправляє їх у правильному порядку, залежно від статусу запиту
   async (_, { rejectWithValue }) => {
  try {
    const { data } = await contactsAPI.get();
    return data;
  } catch (error) {
      return rejectWithValue(error.message);
    // rejectWithValue - описове повідомлення про помилку
  }
});
// екшен fetchContacts - одержання масиву контактів (метод GET) запитом. Базовий тип екшену "contacts/fetchAll".

export const addContact = createAsyncThunk('contacts/addContact',
    async (contact, { rejectWithValue }) => {
        try {
            const { data } = await contactsAPI.post('', contact);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        };
    });
// екшен addContact - додавання контакту (метод POST). Базовий тип екшену "contacts/addContact".

export const deleteContact = createAsyncThunk('contacts/deleteContacts',
    async (contactId, { rejectWithValue, dispatch }) => {
  try {
    await contactsAPI.delete(contactId);
    dispatch(fetchContacts());

    // return data.id;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
 // екшен deleteContact - видалення контакту (метод DELETE). Базовий тип екшену "contacts/deleteContact"
