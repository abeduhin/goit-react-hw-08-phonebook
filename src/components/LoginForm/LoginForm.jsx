import { useDispatch } from "react-redux";
import { Form, Button, Container } from 'react-bootstrap';
import style from './LoginForm.module.css';
import { logIn } from "redux/auth/operations";
import { useState } from "react";

export const LoginForm = () => {
    const dispatch = useDispatch();

    const [values, setValues] = useState({
     email: '',
     password: '',
    });
    
    const handleChange = event => {
    const { value, name } = event.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

    const handleSubmit = async event => {
        event.preventDefault();
        dispatch(logIn(values));
        
    };

    return (
        <Container className={style.container}>
            <Form className='border rounded p-4' onSubmit={handleSubmit}>
                <p className={style.paragraph}>Please, log in</p>
                <Form.Group className='mb-3' controlId='inputEmail'>
                    <Form.Label>e-mail</Form.Label>
                    <Form.Control
                        className={style.input}
                        name='email'
                        type='email'
                        value={values.email}
                        onChange={handleChange}
                        title='example@email.com'
                        placeholder='Enter your email'
                        required
                    />
                </Form.Group>
                <Form.Group className='mb-3' controlId='inputPassword'>
                    <Form.Label>password</Form.Label>
                    <Form.Control
                        className={style.input}
                        name='password'
                        type='password'
                        title='password'
                        value={values.password}
                        onChange={handleChange}
                        placeholder='Enter your password'
                        minLength='5'
                        required
                    />
                </Form.Group>
                <Button variant='primary' type='submit'>Log in</Button>
            </Form>
        </Container>
    );
};