import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "@mui/material/Button";
import * as React from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useState} from "react";
import LoginPage from "./LoginPage";

export default function HomePage(){
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(true);



    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:8000/auth/logout/', {
                // Add data if needed (e.g., token, user ID)
            });

            console.log('Logout successful:', response.data);
            setCurrentUser(false);
            navigate('/');
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                console.error('Logout error (401):', error.response.data);  // Log for debugging
            } else {
                console.error('Unexpected error:', error);  // Log other errors
            }
        }
    };

        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand>Authentication App</Navbar.Brand>
                        <Navbar.Toggle/>
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                <form onSubmit={handleLogout} >
                                    <Button variant="contained" type="submit" color="primary" sx={{mt: 2}} >Log out</Button>
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