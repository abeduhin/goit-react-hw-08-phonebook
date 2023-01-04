import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import itemContacts from '../data/contacts.json';

const LOCAL_KEY = 'contacts';
export class App extends Component {
  state = {
    contacts: itemContacts,
    filter: '',
    
  };

  componentDidMount() {
    const contactsFromList = localStorage.getItem(LOCAL_KEY);
    const parseContacts = JSON.parse(contactsFromList);

    if (parseContacts) {
      this.setState({ contacts: parseContacts });
    }
  }

  componentDidUpdate(_, prevState) {
    const prevStateContacts = prevState.contacts;
    const nextStateContacts = this.state.contacts;

    if (prevStateContacts !== nextStateContacts) {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(nextStateContacts));
    }
  }


  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  // прописуємо фунцію для вводу пошуку

  handleSubmit = e => {
    const id = nanoid();
    const name = e.name;
    const number = e.number;
    const contactsLists = [...this.state.contacts];

    if (contactsLists.findIndex(contact => name === contact.name) !== -1) {
      alert(`${name} is already in contacts.`);
    } else {
      contactsLists.push({ name, id, number });
    }
    // прописуємо умову - якщо новий елемент списка (name) вже є у списку контактів (метод findIndex повертає індекс відмінний від -1 ). то виводимо повідомлення якщо не має то добовляємо до списку контактів

    this.setState({ contacts: contactsLists });
    // змінюємо стан
  };

  handleDelete = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };
  // прописуємо функцію яка міняє стан при активації кнопки DElete (порередній стан prevState )

  getFilteredContacts = () => {
    const filterContactsList = this.state.contacts.filter(contact => {
      return contact.name
        .toLowerCase()
        .includes(this.state.filter.toLowerCase());
    });

    return filterContactsList;
  };
  // прописуємо функцію яка фільтрує список кониактів незважаючі на регистр.

  render() {
    const { filter } = this.state;

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm handleSubmit={this.handleSubmit} />
        
        <h2> Contacts</h2>
        <Filter filter={filter} handleChange={this.handleChange} />
        <ContactList
          contacts={this.getFilteredContacts()}
          handleDelete={this.handleDelete}
          />
      </div>
    );
  }
}
