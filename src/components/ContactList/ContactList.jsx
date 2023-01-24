import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, fetchContacts } from 'redux/contactsAPI/contactsAPIThunk';
import { getContacts, getFilter } from 'redux/selectors';
import css from './ContactList.module.css';


// список контактів (масив елементів містить ім'я. номер телефону )
export const ContactList = () => {
  const contacts = useSelector(getContacts)
  const filter = useSelector(getFilter)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  
  const handleDelete = id => {
    dispatch(deleteContact(id));
  };

    const filteredContactsList = contacts.filter(contact => {
      return contact.name
        .toLowerCase()
        .includes(filter.toLowerCase());
    });
    
   // прописуємо функцію яка фільтрує список контактів незважаючі на регистр.

  return (
    <div className={css.wraperContactList}>
      <ul className={css.contactList}>
        {filteredContactsList.map((contact, id) => (
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