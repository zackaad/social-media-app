import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './login';
import Signup from './signup';
import Hello from './hello';
import axiosInstance from '../actions/axiosApi';
import { Button } from '@mui/material';
import Posts from './posts';
import SinglePost from './singlePost';
import CreatePost from "./createpost";

const App: React.FC = () => {

    const handleLogout = async (event: React.MouseEvent<HTMLButtonElement>) => {
        try {
            const response = await axiosInstance.post('http://localhost:8000/auth/blacklist/', {
                "refresh_token": localStorage.getItem("refresh_token")
            });
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            axiosInstance.defaults.headers['Authorization'] = null;

            window.location.href = "/login";
            return response;
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="site">
            <nav>
                <Link className={"nav-link"} to="/">Home</Link>
                <Link className={"nav-link"} to="/login">Login</Link>
                <Link className={"nav-link"} to="/signup">Signup</Link>
                <Link className={"nav-link"} to="/hello">Hello</Link>
                <Link className={"nav-link"} to="/posts">Posts</Link>
                <Link className={"nav-link"} to="/create_post">Create post</Link>
                <Button variant="contained" color="primary" onClick={handleLogout}>Logout</Button>
            </nav>
            <main>
                <Routes>
                    <Route path="/login/" element={<Login />} />
                    <Route path="/signup/" element={<Signup />} />
                    <Route path="/hello/" element={<Hello />} />
                    <Route path="/posts/" element={<Posts />} />
                    <Route path="/create_post/" element={<CreatePost />} />
                    <Route path="/" element={<div>Welcome!</div>} />
                    <Route path="/posts/:postId" element={<SinglePost />} />
                </Routes>
            </main>
        </div>
    );
};

export default App;
