import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

  export const App = () => {
    const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? [];
    });
    // Лінива ініціалізація стейту
    useEffect(() => {
     window.localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts]);
    
    const [filter, setFilter] = useState('');
         
    const handleChange = e => {
    const { value } = e.target;
    setFilter(value);
  };
   // прописуємо фунцію для вводу пошуку
    
    const handleSubmit = ({ name, number }) => {
    const id = nanoid();
    const contactsLists = [...contacts];

    if (contactsLists.findIndex(contact => name === contact.name) !== -1) {
      alert(`${name} is already in contacts.`);
    } else {
      contactsLists.push({ id, name, number });
    }
    // прописуємо умову - якщо новий елемент списка (name) вже є у списку контактів (метод findIndex повертає індекс відмінний від -1 ). то виводимо повідомлення якщо не має то добовляємо до списку контактів
      
      setContacts(contactsLists);
    // змінюємо стан  
  };

    const handleDelete = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
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
   // прописуємо функцію яка фільтрує список кониактів незважаючі на регистр.

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
