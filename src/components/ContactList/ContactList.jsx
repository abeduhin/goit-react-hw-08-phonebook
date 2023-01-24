// import propTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchContacts } from 'redux/contactsAPI/contactsAPIThunk';
import css from './ContactList.module.css';


// список контактів (масив елементів містить ім'я. номер телефону )
export const ContactList = ({ contacts, handleDelete }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  
  const handleDelete = id => {
    dispatch(deleteContact(id));
  };

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
};

// ContactList.propTypes = {
//   contacts: propTypes.arrayOf(
//     propTypes.exact({
//       id: propTypes.string.isRequired,
//       name: propTypes.string.isRequired,
//       phone: propTypes.string.isRequired,
//     })
//   ),
//   handleDelete: propTypes.func.isRequired,
// };