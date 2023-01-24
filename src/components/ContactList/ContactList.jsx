import propTypes from 'prop-types';
import css from './ContactList.module.css';


// список контактів (масив елементів містить ім'я. номер телефону )
export const ContactList = ({ contacts, handleDelete }) => (
  <div className={css.wraperContactList}>
    <ul className={css.contactList}>
      {contacts.map((contact, id) => (
          <li key={id} className={css.contactListItem}>
          {contact.name}: {contact.phone}
          <button
            type="button"
            className={css.contactListItemBtn}
            onClick={() => handleDelete(contact.id)}
            // додаємо обробника події onclick - визиваємо функцію handleDelete
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  </div>
);

ContactList.propTypes = {
  contacts: propTypes.arrayOf(
    propTypes.exact({
      id: propTypes.string.isRequired,
      name: propTypes.string.isRequired,
      number: propTypes.string.isRequired,
    })
  ),
  handleDelete: propTypes.func.isRequired,
};