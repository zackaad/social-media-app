import React, { useState, useEffect } from "react";
import axiosInstance from "../actions/axiosApi";
import {Link} from "react-router-dom";
import { List, ListItem, ListItemText, ListItemSecondaryAction } from '@mui/material';


export interface Post {
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


const Posts: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(false); // State for loading indicator
    const [error, setError] = useState<Error | null>(null); // State for error

    useEffect(() => {
        const access_token = localStorage.getItem("access_token")
        const fetchData = async () => {
            setIsLoading(true);
            setError(null); // Reset error state
            try {
                const response = await axiosInstance.get<Post[]>(
                    "http://localhost:8000/feed/posts/",
                    {
                        headers: {
                            Authorization: `Bearer ${access_token}` // Include access token in headers
                        }
                    }
                );
                setPosts(response.data);
            } catch (error) {
                console.error("Error fetching posts:", error);
                setError(error as Error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handlePostClick = async (postId: number) => {
        try {
            const response = await axiosInstance.get<Post>(
                `http://localhost:8000/feed/posts/`
            );
            console.log("Post details:", response.data); // Handle the retrieved post data
            // You can navigate to a dedicated post detail page here if needed
        } catch (error) {
            console.error("Error fetching post details:", error);
        }
    };


    if (isLoading) {
        return <p>Loading posts...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div>
            <h2>Posts</h2>
            <List dense={false}>
                {posts.map((post) => (
                    <ListItem key={post.id} button component={Link} to={`/posts/${post.id}`}>
                        <ListItemText
                            primary={post.title + " by " + post.author.username}
                            secondary={post.content.slice(0, 100) + (post.content.length > 100 ? "..." : "")}
                        />
                        <ListItemSecondaryAction>
                            {/* Add any additional actions for the post here (optional) */}
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </div>
    );
}
export default Posts;
