import { useSelector, useDispatch } from 'react-redux';
import { getContacts, getFilter} from 'redux/contacts/selectors';
import { deleteContact } from 'redux/contacts/operations';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import propTypes from 'prop-types';

const getVisibleContacts = (contacts, filter) => {
    if (!filter) {
        return contacts;
    } else {
        return contacts.filter(contact => {
            return contact.name.toLowerCase().includes(filter.toLowerCase());
        });
    };
};

export const ContactList = () => {
    const contacts = useSelector(getContacts);
    const filter = useSelector(getFilter);
    const dispatch = useDispatch();
    const visibleContacts = getVisibleContacts(contacts, filter);
    const del = id => {
        return dispatch(deleteContact(id));
    };

    return (
        <div>
            <ListGroup as="ol" numbered>
                {visibleContacts.map((contact, id) => (
                        <ListGroup.Item as="li" key={id}>
                            <p>{contact.name}: {contact.number}</p>
                                <Button variant='secondary' type="button" onClick={() => del(contact.id)}>
                                    Delete
                                </Button>
                        </ListGroup.Item>
                ))}
                </ListGroup>
        </div>
    );
};

ContactList.propTypes = {
    contacts: propTypes.arrayOf(
        propTypes.shape({
            id: propTypes.string.isRequired,
            name: propTypes.string.isRequired,
            number: propTypes.string.isRequired,
        })
    ),
};