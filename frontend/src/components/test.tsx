import './App.css';
import React, { useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// Set CSRF defaults for axios (optional)
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
    baseURL: "http://localhost:8000"
});


interface MyComponentProps {
    title?: string;
}

interface User {
    // Add properties for your user object (e.g., email, username, etc.)
}


const App: React.FC<MyComponentProps> = (props) => {

    const [currentUser, setCurrentUser] = useState(false);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleRegister = (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        client.post(
            "/auth/register",
            {
                email: email,
                username: username,
                password: password
            }
        ).then(function(res) {
            client.post(
                "/auth/login",
                {
                    email: email,
                    password: password
                }
            ).then(function(res) {
                setCurrentUser(true);
            });
        });
    }

    const handleLogin = (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        client.post(
            "/auth/login",
            {
                email: email,
                password: password
            }
        ).then(function(res) {
            setCurrentUser(true);
        });
    }

    const submitLogout = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        client.post(
            "/auth/logout",
            {withCredentials: true}
        ).then(function(res) {
            setCurrentUser(false);
        });
    }

    if (currentUser) {
        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand>Authentication App</Navbar.Brand>
                        <Navbar.Toggle />
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                <form onSubmit={(e) => submitLogout(e)}>
                                    <Button type="submit" variant="light">Log out</Button>
                                </form>
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <div className="center">
                    <h2>You're logged in!</h2>
                </div>
            </div>
        );
    }


    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>Authentication App</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="center">
            </div>
        </div>
    )
};

export default App;
