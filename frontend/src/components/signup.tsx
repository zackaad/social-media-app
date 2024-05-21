import React, {Component, ChangeEvent, FormEvent, useState} from "react";
import axiosInstance from "../actions/axiosApi";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

interface SignUpFormState {
    username: string;
    password: string;
    email: string;
}
function Signup() {
    const [signUpFormState, setSignUpFormState] = useState<SignUpFormState>({
        username: '',
        password: '',
        email: ''
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setSignUpFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const username = signUpFormState.username;
            const email = signUpFormState.email;
            const password = signUpFormState.password;

            const response = await axiosInstance.post("http://localhost:8000/auth/create/", {
                username,
                email,
                password,
            });

            if (response.status !== 201) {
                throw new Error(`Network response was not ok. Status: ${response.status}`);
            }


            console.log("Signup successful!");
            window.location.href = "/login";
        } catch (error: any) {
            console.error('Error during signup:', error);

        }



    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Username"
                variant="outlined"
                name="username"
                value={signUpFormState.username}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Email"
                variant="outlined"
                name="email"
                type="email"
                value={signUpFormState.email}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Password"
                variant="outlined"
                name="password"
                type="password"
                value={signUpFormState.password}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Signup
            </Button>
        </form>
    );
};


export default Signup;