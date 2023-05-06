import React from 'react';
import axios from 'axios';

import { useRef, useState, useEffect } from 'react';
import { Stack, Form, Button} from 'react-bootstrap';

import './login.styles.css';
import phMap from '../../assets/phmap.png';

function Login() {

    const username = useRef();
    const password = useRef();

    const [error, setError] = useState();

    useEffect(() => {

    }, [error]);

    function handleSubmit(e) {
        e.preventDefault();


        axios.post('https://netzwelt-devtest.azurewebsites.net/Account/SignIn', {
                "username": username.current.value,
                "password": password.current.value
            })
            .then( (result) => {
                localStorage.setItem("token", result.data);
			    window.location = "/";
            })
            .catch( (error) => {
                setError(error.message)
            });

    }

    return (
        <div className="login_page">
            <div className="form_container">
                <div className="phMap">
                    <img className='image' src={phMap} alt='ph map' />
                </div>
                <Stack className='m-0 p-0 justify-content-center'>
                    <h1 className='login_message'>WELCOME BACK</h1>
                    <Form className='login_form' onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Control ref={username} type="text" placeholder="Username" required/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control ref={password} type="password" placeholder="Password" required/>
                        </Form.Group>
                        {error && <h6 style={{color: 'red'}} >{error}</h6>}
                        <Button variant="primary" type="submit">
                            LOGIN
                        </Button>
                    </Form>
                </Stack>
            </div>
        </div>
    );
}

export default Login;