import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './login';
import Signup from './signup';
import axiosInstance from '../actions/axiosApi';
import { Button } from '@mui/material';
import Posts from './posts';
import SinglePost from './singlePost';
import CreatePost from "./createpost";
import Profile from "./profile";

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
            <nav style={{display: 'flex', justifyContent: 'space-between', padding: '10px 20px'}}>
                <Link className={"nav-link"} to="/">Home</Link>
                <Link className={"nav-link"} to="/login">Login</Link>
                <Link className={"nav-link"} to="/signup">Signup</Link>
                <Link className={"nav-link"} to="/posts">Posts</Link>
                <Link className={"nav-link"} to="/self">Profile</Link>
                <Link className={"nav-link"} to="/create_post">Create post</Link>
                <Button variant="contained" color="primary" onClick={handleLogout}>Logout</Button>
            </nav>
            <main>
                <Routes>
                    <Route path="/login/" element={<Login />} />
                    <Route path="/signup/" element={<Signup />} />
                    <Route path="/posts/" element={<Posts />} />
                    <Route path="/self/" element={<Profile />} />
                    <Route path="/create_post/" element={<CreatePost />} />
                    <Route path="/" element={<h1>Welcome!</h1>} />
                    <Route path="/posts/:postId" element={<SinglePost />} />
                </Routes>
            </main>
        </div>
    );
};

export default App;
