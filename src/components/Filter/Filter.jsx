import { useDispatch } from 'react-redux';
import { handleFilter } from 'redux/contacts/contactsSlice';
import Form from 'react-bootstrap/Form';
import css from './Filter.module.css'

export const Filter = () => {

    const dispatch = useDispatch();
    const onChange = e => {
        const value = e.target.value.toLowerCase();
        dispatch(handleFilter(value));
    };
    return (
        <Form className='mb-1' style={{ paddingTop: 20, paddingBottom: 20 }}>
            <Form.Group>
                <Form.Label>Find contacts by name</Form.Label>
                <Form.Control
                    className={css.input}
                    type='name'
                    onChange={onChange}
                />
            </Form.Group>
        </Form>
    );
};