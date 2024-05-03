import * as React from 'react';
import Button from '@mui/material/Button';
import {useState} from "react";
import axios from 'axios';
import {TextField} from "@mui/material";
import { useNavigate } from 'react-router-dom';




export default function LoginPage() {

    const [currentUser, setCurrentUser] = useState(false);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegisterClick = () => {
        navigate('register');
    };


    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await axios({
                method: 'post',
                url: 'http://localhost:8000/auth/login/',
                data: {
                    email: email,
                    password: password
                }
            });

            // Login successful (handle success case)
            console.log('Login successful:', response.data);
            setCurrentUser(true)
            navigate('/home')

        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                console.error('Login error (401):', error.response.data);  // Log for debugging
            } else {
                console.error('Unexpected error:', error);  // Log other errors
            }
        }
    };


    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh'}}>
            <form onSubmit={(event) => handleLogin(event)}>
                <TextField
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    margin="normal"
                    fullWidth
                    required
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    margin="normal"
                    fullWidth
                    required
                />
                <Button variant="contained" type="submit" color="primary" sx={{mt: 2}}>
                    Login
                </Button>
            </form>

                <Button onClick={handleRegisterClick} variant="contained" type="submit" color="primary" sx={{mt: 2}}>Register</Button>

        </div>
    );
}