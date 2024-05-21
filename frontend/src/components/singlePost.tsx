import React, {useState, useEffect, FormEvent} from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from "../actions/axiosApi";
import { Card, CardContent, Typography, List, ListItem, ListItemText, TextField, Button } from '@mui/material';
import {json} from "node:stream/consumers";


interface User {
    id: number;
    username: string;
    email: string;
}



interface Post {
    id: number;
    title: string;
    content: string;
    comments: string[];
    author: User;
}

interface Comment {
    id: number; // Assuming comment has an ID
    content: string;
    author: User;
}

interface NewComment{
    post: string | undefined;
    content: string;
}



const SinglePost: React.FC = () => {
    const { postId } = useParams<{ postId: string }>(); // Type the parameter
    const [postDetails, setPostDetails] = useState<Post | null>(null);
    const access_token = localStorage.getItem("access_token")
    const [comments, setComments] = useState<Comment[]>([]); // State for fetched comments
    const [user, setUser] = useState<User | null>(null);
    const [newComment, setNewComment] = useState<NewComment>({
        post: postId,
        content: ''

    });

    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(false); // State for loading indicator
    const [error, setError] = useState<Error | null>(null); // State for error


    const fetchUserData = async () => {
        try {
            const whoamiResponse = await axiosInstance.get<User>(
                "http://localhost:8000/auth/whoami/",
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`, // Include access token in headers
                    },
                }
            );
            setUser(whoamiResponse.data)
        } catch (error) {
            console.error("Error fetching user data. Not logged in");
        }

    };




    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setNewComment({ ...newComment, [name]: value }); // Update specific property based on name
    };


    const handleSubmitComment = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission behavior
        const access_token = localStorage.getItem("access_token");

        try {
            const response = await axiosInstance.post<Comment>(
                'http://localhost:8000/feed/comments/',
                newComment, {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                }
            );
            console.log('Comment created successfully:', response.data);
            setComments([...comments, response.data]);
            setNewComment({ post: postId, content: '' });




        } catch (error) {
            console.error('Error creating post:', error);
            // Handle errors appropriately, e.g., display error message to the user
        }
    };

    const fetchPostDetailsAndComments = async () => {
        setIsLoading(true);

        try {
            const response = await axiosInstance.get<Post>(
                `http://localhost:8000/feed/posts/${postId}/`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                }
            );
            setPostDetails(response.data);

            const commentsResponse = await axiosInstance.get<Comment[]>(
                `http://localhost:8000/feed/posts/${postId}/comments/`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                }
            );
            setComments(commentsResponse.data);

        } catch (error) {
            console.error("Error fetching post details:", error);
            setError(error as Error);
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            await fetchUserData();
            await fetchPostDetailsAndComments()


        };

        fetchData();
    }, [postId]); // Re-run effect when postId changes


    return (
        <Card>
            {postDetails ? (
                <CardContent>
                    <Typography variant="h5">{postDetails.title + " by " + postDetails.author.username}</Typography>
                    <Typography variant="body1">{postDetails.content}</Typography>

                    <h3>Comments</h3>
                    <List dense={false}>
                        {comments.map((comment) => (
                            <ListItem key={comment.id}>
                                <ListItemText primary={comment.author.username + " : " + comment.content} />
                            </ListItem>
                        ))}
                    </List>

                    <form onSubmit={handleSubmitComment}>
                        <TextField fullWidth label="Add Comment" id="content" name="content" multiline minRows={4} onChange={handleChange} required />
                        <br />
                        <Button variant="contained" color="primary" type="submit">
                            Submit Comment
                        </Button>
                    </form>
                </CardContent>
            ) : (
                <CardContent>
                    <Typography variant="body1">Loading post details...</Typography>
                </CardContent>
            )}
        </Card>
    );
};

export default SinglePost;
