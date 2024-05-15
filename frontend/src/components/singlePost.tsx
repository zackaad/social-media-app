import React, {useState, useEffect, FormEvent} from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from "../actions/axiosApi";
import { Card, CardContent, Typography, List, ListItem, ListItemText, TextField, Button } from '@mui/material';




interface Post {
    id: number;
    title: string;
    content: string;
    comments: string[];
}

interface Comment {
    id: number; // Assuming comment has an ID
    content: string;
    // Add any other properties as needed based on your API response
}

interface NewComment{
    post: string | undefined;
    content: string;
    author: string
}



const SinglePost: React.FC = () => {
    const { postId } = useParams<{ postId: string }>(); // Type the parameter
    const [postDetails, setPostDetails] = useState<Post | null>(null);
    const access_token = localStorage.getItem("access_token")
    const [comments, setComments] = useState<Comment[]>([]); // State for fetched comments
    const [newComment, setNewComment] = useState<NewComment>({
        post: postId,
        content: '',
        author: "1",
    });




    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setNewComment({ ...newComment, [name]: value }); // Update specific property based on name
    };


    const handleSubmitComment = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission behavior

        const access_token = localStorage.getItem("access_token");


        try {
            console.log("Trying to post to post number" + postId)
            const response = await axiosInstance.post<Comment>( // Replace with your actual comment creation endpoint
                `http://localhost:8000/feed/comments/`,
                newComment,
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                }

            );
            setComments([...comments, response.data]); // Update comments state with new comment
        } catch (error) {
            console.error('Error submitting comment:', error);
            console.log(newComment)
            // Handle submission errors (e.g., display error message to the user)
        }
    };


    useEffect(() => {
        const fetchPostDetails = async () => {

            try {
                const response = await axiosInstance.get<Post>(
                    `http://localhost:8000/feed/posts/${postId}/`, {
                        headers: {
                            Authorization: `Bearer ${access_token}` // Include access token in headers
                        }
                    }
                );
                setPostDetails(response.data);

                const commentsResponse = await axiosInstance.get<Comment[]>(`http://localhost:8000/feed/posts/${postId}/comments/`, {
                    headers: {
                        Authorization: `Bearer ${access_token}` // Include access token in headers
                    }
                });
                setComments(commentsResponse.data);
            } catch (error) {
                console.error("Error fetching post details:", error);
            }
        };
        fetchPostDetails();
    }, [postId]); // Re-run effect when postId changes

    return (
        <Card>
            {postDetails ? (
                <CardContent>
                    <Typography variant="h5">{postDetails.title}</Typography>
                    <Typography variant="body1">{postDetails.content}</Typography>

                    <h3>Comments</h3>
                    <List dense={false}>
                        {comments.map((comment) => (
                            <ListItem key={comment.id}>
                                <ListItemText primary={comment.content} />
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
