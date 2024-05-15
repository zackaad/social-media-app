import React, {Component, ChangeEvent, FormEvent, useState} from "react";
import axiosInstance from "../actions/axiosApi";

interface LoginFormState {
    username: string;
    password: string;
}
function Login() {
    const [loginFormState, setLoginFormState] = useState<LoginFormState>({
        username: '',
        password: '',
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setLoginFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };


    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const username = loginFormState.username;
            const password = loginFormState.password;

            const response = await fetch('http://localhost:8000/api/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error(`Network response was not ok. Status: ${response.status}`);
            }

            const data = await response.json();

            axiosInstance.defaults.headers['Authorization'] = "JWT " + data.access;
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);

            window.location.href = "/home";
        } catch (error: any) {
            console.error('Error during login:', error);
            // Handle login error appropriately (e.g., display error message)
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input
                        name="username"
                        type="text"
                        value={loginFormState.username}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Password:
                    <input
                        name="password"
                        type="password"
                        value={loginFormState.password}
                        onChange={handleChange}
                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};




export default Login;