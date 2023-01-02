import propTypes from 'prop-types';
import React, { Component } from 'react';
import css from './ContactForm.module.css';

// форма додавання контактів (2 інпута та кнопка)

const INITIAL_STATE = {
  name: '',
  number: '',
}

export class ContactForm extends Component {
  state = { ...INITIAL_STATE };
  //   name: '',
  //   number: '',
  // };
  // початковий стан з властивостями name та number (два input)

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  // функція для обробки події де вона сталося та зміни початкового стану. Унівесальний метод (для обох інпутів) який записує в нашу форму те що ввів юзер. Змінна name приймає значення name або number

  handleSubmit = e => {
    e.preventDefault();
    // відмянюємо поведінку за замовчуванням
    const form = e.currentTarget;
    this.props.handleSubmit(this.state);
    // добавляємо новий контакт в список контактів
    form.reset();
    // скидаємо значення неконтрольованих полів форми до їх початкових значень
    this.setState({ ...INITIAL_STATE })
    // очищаємо форму
  };
  // функція для обробки події де вона відслідила

  render() {
    const { name, number } = this.state;

    return (
      <form className={css.form} onSubmit={this.handleSubmit}>
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
          onChange={this.handleChange}
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
          onChange={this.handleChange}
          // вішаємо обробника подій onChange який слідкує за змінами в інпуті - функція handleChange
        />
        <button className={css.formBtn} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  handleSubmit: propTypes.func.isRequired,
  
};