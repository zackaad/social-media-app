import React, {Component, ChangeEvent, FormEvent, useState} from "react";
import axiosInstance from "../actions/axiosApi";

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
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input
                        name="username"
                        type="text"
                        value={signUpFormState.username}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Email:
                    <input
                        name="email"
                        type="email"
                        value={signUpFormState.email}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Password:
                    <input
                        name="password"
                        type="password"
                        value={signUpFormState.password}
                        onChange={handleChange}
                    />
                </label>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    );
};


export default Signup;