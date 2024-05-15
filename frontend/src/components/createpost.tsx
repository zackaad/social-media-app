import React, {FormEvent, useState} from "react";
import axiosInstance from "../actions/axiosApi";
import { Button, TextField, Grid, Typography } from '@mui/material';


interface NewPost{
    title: string,
    content: string
}

const CreatePost: React.FC = () => {

    const [newPost, setNewPost] = useState<NewPost>({
        title: '',
        content: ''
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setNewPost({ ...newPost, [name]: value }); // Update specific property based on name
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission behavior
        const access_token = localStorage.getItem("access_token");

        try {
            const response = await axiosInstance.post<NewPost>(
                'http://localhost:8000/feed/posts/',
                newPost, {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                }
            );
            console.log('Post created successfully:', response.data);
            window.location.href = "/posts/";
        } catch (error) {
            console.error('Error creating post:', error);
            // Handle errors appropriately, e.g., display error message to the user
        }
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h5">Create Post</Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Title"
                    id="title"
                    name="title"
                    value={newPost.title}
                    onChange={handleChange}
                    required
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Content"
                    multiline
                    minRows={4}
                    id="content"
                    name="content"
                    value={newPost.content}
                    onChange={handleChange}
                    required
                />
            </Grid>
            <Grid item xs={12}>
                <form onSubmit={handleSubmit}>
                    <button>
                        Create Post
                    </button>
                </form>

            </Grid>
        </Grid>
    );
};


export default CreatePost