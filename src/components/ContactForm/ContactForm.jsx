import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts } from 'redux/contacts/selectors';
import { addContact } from 'redux/contacts/operations';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import css from './ContactForm.module.css';

export const ContactForm = () => {
    const contacts = useSelector(getContacts);
    const dispatch = useDispatch();

    const addNewContact = e => {
        e.preventDefault();
        const form = e.currentTarget;  
        const name = form.elements.name.value;
        const number = form.elements.number.value;
        const nameLowerCase = name.toLowerCase();
        let onTheList = false;

        const newContact = {
            name: name,
            number: number,
        };

        contacts.forEach(contact => {
            if (contact.name.toLowerCase() === nameLowerCase) {
                alert(`${contact.name} is already on the list`);
                onTheList = true;
            };
        });
        if (onTheList) {
            return;
        };
        
        dispatch(addContact(newContact));
        form.reset();
    };

    return (
        <Form className="no-border" onSubmit={addNewContact}>
            <p className={css.paragraph}>Add a new contact</p>
            <Form.Group className='mb-3' controlId='inputName'>
            <Form.Label>Name</Form.Label>
            <Form.Control
                className={css.input}
                type="text"
                name="name"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                placeholder='Enter name'
                required
            />
            </Form.Group>
            <Form.Group className='mb-3' controlId='inputPhone'>
            <Form.Label>Phone</Form.Label>
            <Form.Control
                className={css.input}
                type="tel"
                name="number"
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                placeholder='Enter number'
                required
                />
                </Form.Group>
            <Button variant='secondary' type="submit">
                Add contact
            </Button>
        </Form>
    );
};
