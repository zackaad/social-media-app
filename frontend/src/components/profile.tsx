import React, { useState, useEffect } from "react";
import axiosInstance from "../actions/axiosApi";
import { Link } from "react-router-dom";
import {List, ListItem, ListItemText, ListItemSecondaryAction, Button} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import {json} from "node:stream/consumers";


interface Post {
    id: number;
    title: string;
    content: string;
    author: User;
}

interface User {
    id: number;
    username: string;
    email: string;
}

interface Comment {
    id: number; // Assuming comment has an ID
    content: string;
    author: User;
}


const Profile: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [comments, setComments] = useState<Post[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false); // State for loading indicator
    const [error, setError] = useState<Error | null>(null); // State for error
    const [uid, setUID] = useState<number>(0); // State for error
    const access_token = localStorage.getItem("access_token")



    const fetchProfilePosts = async () => {
        try {
            const access_token = localStorage.getItem("access_token");

            if (!access_token) {
                console.error("No access token found");
                return; // Exit if no access token
            }

            const response = await axiosInstance.get('http://localhost:8000//feed/profiles/me/posts/', {
                headers: {
                    Authorization: `Bearer ${access_token}`, // Include access token in headers
                },
            });

            console.log("Profile posts:", response.data);
            setPosts(response.data)
            // Handle the fetched profile posts data here (e.g., update UI)
        } catch (error) {
            console.error("Error fetching profile posts:", error);
            // Handle errors (e.g., display error message)
        }
    };

    const fetchProfileComments = async () => {
        try {
            const access_token = localStorage.getItem("access_token");

            if (!access_token) {
                console.error("No access token found");
                return; // Exit if no access token
            }

            const response = await axiosInstance.get('http://localhost:8000//feed/profiles/me/comments/', {
                headers: {
                    Authorization: `Bearer ${access_token}`, // Include access token in headers
                },
            });

            console.log("Profile comments:", response.data);
            setComments(response.data)

        } catch (error) {
            console.error("Error fetching profile posts:", error);
            // Handle errors (e.g., display error message)
        }
    };

    const fetchUser = async () => {
        try {
            const access_token = localStorage.getItem("access_token");

            if (!access_token) {
                console.error("No access token found");
                return; // Exit if no access token
            }

            const response = await axiosInstance.get('http://localhost:8000//auth/whoami/', {
                headers: {
                    Authorization: `Bearer ${access_token}`, // Include access token in headers
                },
            });

            console.log("Profile posts:", response.data);
            setUser(response.data)
            // Handle the fetched profile posts data here (e.g., update UI)
        } catch (error) {
            console.error("Error fetching profile posts:", error);
            // Handle errors (e.g., display error message)
        }
    };

    useEffect(() => {
        fetchUser()
        fetchProfilePosts()
        fetchProfileComments()

    }, []);




    const handlePostClick = async (postId: number) => {
        try {
            const response = await axiosInstance.get<Post>(
                `http://localhost:8000/feed/posts/${postId}/`
            );
            console.log("Post details:", response.data); // Handle the retrieved post data
            // You can navigate to a dedicated post detail page here if needed
        } catch (error) {
            console.error("Error fetching post details:", error);
        }
    };

    const handleDelete = async (postId: number) => {
        setIsLoading(true); // Set loading state to indicate ongoing action
        setError(null); // Reset error state

        try {
            const access_token = localStorage.getItem("access_token");
            if (!access_token) {
                throw new Error("Missing access token"); // Handle missing token
            }

            const response = await axiosInstance.delete(
                `http://localhost:8000/feed/posts/${postId}/`,
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`, // Include access token
                    },
                }
            );

            console.log("Post deletion response:", response.data); // Handle response

            // Update UI if deletion is successful (e.g., remove post from state)
            const updatedPosts = posts.filter((post) => post.id !== postId);
            setPosts(updatedPosts);

        } catch (error) {
            console.error("Error deleting post:", error);
            setError(error as Error); // Set error state
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };

    const handleDeleteComment = async (commentId: number) => {
        setIsLoading(true); // Set loading state to indicate ongoing action
        setError(null); // Reset error state

        try {
            const access_token = localStorage.getItem("access_token");
            if (!access_token) {
                throw new Error("Missing access token"); // Handle missing token
            }

            const response = await axiosInstance.delete(
                `http://localhost:8000/feed/comments/${commentId}/`,
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`, // Include access token
                    },
                }
            );

            console.log("Post deletion response:", response.data); // Handle response

            // Update UI if deletion is successful (e.g., remove post from state)
            const updatedComments = comments.filter((comment) => comment.id !== commentId);
            setComments(updatedComments);

        } catch (error) {
            console.error("Error deleting comment:", error);
            setError(error as Error); // Set error state
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };


    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    if (!user) {
        return <p>Error: Could not retrieve user data.</p>;
    }

    return (
        <div>
            <h2>Profile for {user.username}</h2>
            {/* User info section */}
            <p>Email: {user.email}</p>
            {/* Other relevant user information if available */}
            <h3>My posts:</h3>
            <List dense={false}>
                {posts.map((post) => (
                    <ListItem key={post.id} button component={Link} to={`/posts/${post.id}`}>
                        <ListItemText
                            primary={post.title + " by " + post.author.username}
                            secondary={post.content.slice(0, 100) + (post.content.length > 100 ? "..." : "")}
                        />
                        <ListItemSecondaryAction>
                            <Button onClick={() => handleDelete(post.id)}>Delete</Button>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
            <h3>Comments by me:</h3>
            <List dense={false}>
                {comments.map((comment) => (
                    <ListItem key={comment.id} button >
                        <ListItemText
                            primary={comment.content.slice(0, 100) + (comment.content.length > 100 ? "..." : "")}
                        />
                        <ListItemSecondaryAction>
                            <Button onClick={() => handleDeleteComment(comment.id)}>Delete</Button>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

//Something

export default Profile;
