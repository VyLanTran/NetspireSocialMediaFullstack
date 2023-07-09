import React, { useState } from 'react'
import { Box, Card, Divider, IconButton, InputBase, Typography, } from '@mui/material'
import { Avatar as UserAvatar } from './Avatar'
import { useDispatch, useSelector } from 'react-redux';
import Dropzone from 'react-dropzone';
import { DeleteOutlined, EditOutlined, ImageOutlined, SendOutlined } from '@mui/icons-material';
import styled from '@emotion/styled';
import { setPosts } from '../features/authReducer';


export const NewPost = () => {

    const user = useSelector((state) => state.user);
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const [post, setPost] = useState('');
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user._id);
    const token = useSelector((state) => state.token);

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("userId", userId);
        formData.append("description", post);
        if (image) {
            formData.append("picture", image);
            formData.append("picturePath", image.name);
        }

        const response = await fetch(`http://localhost:3001/posts`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
        });
        const posts = await response.json();
        dispatch(setPosts({ posts }));

        // reset data
        setImage(null);
        setPost("");
    };


    return (
        <Card sx={{ margin: 5, boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)", padding: 2 }}>
            {/* TEXT */}
            <Box display="flex" gap={2} alignItems="center" >
                <UserAvatar
                    image={user.avatar}
                    size="55px"
                />
                <SearchBar>
                    <InputBase
                        placeholder={`What's on your mind, ${user.firstName}`}
                        onChange={(e) => setPost(e.target.value)}
                        value={post}
                        sx={{
                            width: "100%"
                        }}
                    />
                    <IconButton
                        disabled={!post}
                        onClick={handleSubmit}>
                        <SendOutlined />
                    </IconButton>
                </SearchBar>

                <Box gap="0.25rem" onClick={() => setIsImage(!isImage)}>
                    <ImageOutlined sx={{ fontSize: "26px", "&:hover": { cursor: "pointer", } }} />
                </Box>
            </Box>

            {/* UPLOAD IMAGE */}
            {isImage && (
                <Box mt="1rem"  >
                    <Dropzone
                        acceptedFiles=".jpg,.jpeg,.png"
                        multiple={false}
                        onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}   >
                        {({ getRootProps, getInputProps }) => (
                            <Box display="flex"
                                justifyContent="space-between"
                                sx={{ width: "100%" }}>
                                <Box
                                    {...getRootProps()}
                                    border={`1px solid `}
                                    borderRadius="5px"
                                    p="1rem"
                                    width="100%"
                                    height="50px"
                                    sx={{ "&:hover": { cursor: "pointer" } }}   >
                                    <input {...getInputProps()} />
                                    <Box
                                        display="flex"
                                        height="100%"
                                        alignItems="center"    >
                                        {!image ?
                                            (
                                                <Typography sx={{ fontSize: "14px", color: "rgba(255, 0, 0, 0.5)" }}>Upload Image</Typography>
                                            ) :
                                            (
                                                <Box
                                                    display="flex"
                                                    justifyContent="space-between"
                                                    sx={{ width: "100%" }} >
                                                    <Typography sx={{ fontSize: "14px", color: "rgba(255, 0, 0, 0.5)" }}>{image.name}</Typography>
                                                    <EditOutlined />
                                                </Box>
                                            )}
                                    </Box>
                                </Box>
                                {image && (
                                    <IconButton
                                        onClick={() => setImage(null)}   >
                                        <DeleteOutlined />
                                    </IconButton>
                                )}
                            </Box>
                        )}
                    </Dropzone>
                </Box>
            )}
        </Card >
    )
}

const SearchBar = styled(Box)(({
    backgroundColor: "#edf0f2",
    padding: "0 5px 0 20px",
    width: "100%",
    borderRadius: "30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& input": {
        fontSize: "14px",
    },
}));