import React from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { useDispatch, useSelector } from 'react-redux';
// import { addContacts, deleteContacts } from 'redux/contactsSlice';
import { filterGange } from 'redux/filterSlice';
import { getContacts, getFilter } from 'redux/selectors';
import { useEffect } from 'react';
import { fetchContacts, addContact, deleteContact } from 'redux/contactsAPI/contactsAPIThunk';

  export const App = () => {
   

    const contacts = useSelector(getContacts);
    const filter = useSelector(getFilter);
    const dispatch = useDispatch()
         
    const handleChange = e => {
      const { value } = e.target;
      dispatch (filterGange(value))
    };
       // прописуємо фунцію для вводу пошуку
    
    useEffect(() => {
      dispatch(fetchContacts());
    }, [dispatch]);
    
    const handleSubmit = ({ name, phone }) => {
      if (contacts.findIndex(contact => name.toLowerCase() === contact.name.toLowerCase()) !== -1) {
        alert(`${name} is already in contacts.`);
        return
      }      
    
    // прописуємо умову - якщо новий елемент списка (name) вже є у списку контактів (метод findIndex повертає індекс відмінний від -1 )(незалежно від регистра метод toLowerCase приводить все до нижньго регистра).то виводимо повідомлення якщо не має то добовляємо до списку контактів
      dispatch(addContact({ name, phone }));
      
    // змінюємо стан  
  };

    const handleDelete = id => {     
    dispatch(deleteContact(id));
      
    };
  // прописуємо функцію яка міняє стан при активації кнопки DElete 

    const getFilteredContacts = () => {
    const filterContactsList = contacts.filter(contact => {
      return contact.name
        .toLowerCase()
        .includes(filter.toLowerCase());
    });
    return filterContactsList;
  };
   // прописуємо функцію яка фільтрує список контактів незважаючі на регистр.

      return (
      <div>
        <h1>Phonebook</h1>
         <ContactForm handleSubmit={handleSubmit} />
         
        <h2> Contacts</h2>
          <Filter filter={filter} handleChange={handleChange} />
         
        
        <ContactList
          contacts={getFilteredContacts()}
          handleDelete={handleDelete}
          />
      </div>
    );
  }
// виводимо HTTML розмітку
