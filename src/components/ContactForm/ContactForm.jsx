import propTypes from 'prop-types';
import css from './ContactForm.module.css';
import React, { useState } from 'react';

// // форма додавання контактів (2 інпута та кнопка)

export const ContactForm = ({ handleSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  
  // початковий стан з властивостями name та number (два input)
  const contacts = useSelector(getContacts);
  const handleSubmit = ({ name, phone }) => {
      if (contacts.findIndex(contact => name.toLowerCase() === contact.name.toLowerCase()) !== -1) {
        alert(`${name} is already in contacts.`);
        return
      }      
    
    // прописуємо умову - якщо новий елемент списка (name) вже є у списку контактів (метод findIndex повертає індекс відмінний від -1 )(незалежно від регистра метод toLowerCase приводить все до нижньго регистра).то виводимо повідомлення якщо не має то добовляємо до списку контактів
      dispatch(addContact({ name, phone }));
      
    // змінюємо стан  
  };

  const handleChangeName = e => {
  const { value } = e.target;
  setName(value);
  };

  const handleChangeNumber = e => {
  const { value } = e.target;
  setNumber(value);
  };
  // функція для обробки події де вона сталося та зміни початкового стану. Унівесальний метод (для обох інпутів) який записує в нашу форму те що ввів юзер. Змінна name приймає значення name або number
  
   const handleFormSubmit = e => {
    e.preventDefault();
    // відмянюємо поведінку за замовчуванням
    
    handleSubmit({ name: name, number: number });
    // добавляємо новий контакт в список контактів
    setName('');
    setNumber('');
    // очищаємо форму
  };
  // функція для обробки події де вона відслідила

    return (
      <form className={css.form} onSubmit={handleFormSubmit}>
        {/* вішаємо обробника подій onSubmit, для відправки форми в React */}
        <label className={css.formLabel}>Name </label>
        <input
          className={css.formName}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          placeholder="Enter name"
          value={name}
          // дані, які ми хочемо забрати у юзера встановленного порядку (pattern)
          onChange={handleChangeName}
          // вішаємо обробника подій onChange який слідкує за змінами в інпуті - функція handleChange
        />
        <label className={css.formLabel}>Number </label>
        <input
          className={css.formNumber}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          placeholder="Enter phone number"
          value={number}
          // дані, які ми хочемо забрати у юзера встановленного порядку (pattern)
          onChange={handleChangeNumber}
          // вішаємо обробника подій onChange який слідкує за змінами в інпуті - функція handleChange
        />
        <button className={css.formBtn} type="submit">
          Add contact
        </button>
      </form>
    );
  }


ContactForm.propTypes = {
  handleSubmit: propTypes.func.isRequired,
  
};