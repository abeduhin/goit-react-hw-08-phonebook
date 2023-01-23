import { createSlice } from "@reduxjs/toolkit";
import { addContact, deleteContact, fetchContacts } from "./contactsAPIThunk";


const error = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};
const loading = state => {
  state.isLoading = true;
};

const initialState = { items: [], isLoading: false, error: null };
// Оголосимо змінну initialState, у стані якої будемо зберігати масив контактів, прапор статусу завантаження та дані можливої помилки.

const contactsAPISlice = createSlice({
 // Оголосимо слайс списку контактів,   
  name: 'contacts',
    initialState,
  // Передамо початковий стан
    extraReducers: builder => {
    // Властивість extraReducers використовується щоб оголосити редюсери для «зовнішніх» типів екшенів, тобто тих, які не згенеровані з властивості reducers.  
        builder
    // Зворотний виклик, який отримує об'єкт builder(будівельника) для визначення редукторів регістру через виклики builder.addCase(actionCreatorOrType, reducer)
      .addCase(fetchContacts.pending, loading)
      .addCase(addContact.pending, loading)
      .addCase(deleteContact.pending, loading)
    // pending - початок запиту
            
      .addCase(fetchContacts.rejected, error)
      .addCase(addContact.rejected, error)
      .addCase(deleteContact.rejected, error)
    // rejected - завершення запиту з помилкою
        
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
    // прапор статусу завантаження  - false, обнуляємо помилку, увесь масив данних.

      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items.push(action.payload);
      }) 
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = state.items.filter(item => item.id !== action.payload);        
      });
    // fulfilled - успішне завершення запиту
  },
});
const contactsAPIReducer = contactsAPISlice.reducer;
export default contactsAPIReducer;