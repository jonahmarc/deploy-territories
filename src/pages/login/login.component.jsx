import React from 'react';

import { useRef } from 'react';
import { Stack, Form, Button} from 'react-bootstrap';
import axios from 'axios';

import './login.styles.css';
import phMap from '../../assets/phmap.png';

function Login() {

    const username = useRef();
    const password = useRef();

    function handleSubmit(e) {
        e.preventDefault();

        // axios.post('https://netzwelt-devtest.azurewebsites.net/Account/SignIn', {
        //         "username": username.current.value,
        //         "password": password.current.value
        //     })
        //     .then( (result) => {
        //         console.log(result)
        //     })
        //     .catch( (error) => {
        //         console.log(error)
        //     });

        axios.post(
            'https://netzwelt-devtest.azurewebsites.net/Account/SignIn',
            {
                'username': username.current.value,
                'password': password.current.value
            },
            {
                headers: {
                    'accept': 'text/plain',
                    'Content-Type': 'application/json'
                }
            }
        )
        .then( (result) => {
            console.log('SUCCESS')
            console.log(result)
        })
        .catch( (error) => {
            console.log('ERROR')
            console.log(error)
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