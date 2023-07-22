import React, { useState } from 'react'
import { Box, Card, IconButton, InputBase, Typography, } from '@mui/material'
import { Avatar as UserAvatar } from './Avatar'
import { useDispatch, useSelector } from 'react-redux';
import Dropzone from 'react-dropzone';
import { DeleteOutlined, EditOutlined, ImageOutlined, SendOutlined } from '@mui/icons-material';
import styled from '@emotion/styled';
import { setPosts } from '../features/authReducer';
import { useNavigate } from 'react-router-dom';


export const NewPost = () => {
    const baseUrl = "http://localhost:3001";

    const user = useSelector((state) => state.user);
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const [desc, setDesc] = useState('');
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user._id);
    const token = useSelector((state) => state.token);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("userId", userId);
        formData.append("description", desc);
        formData.append("location", user.location);
        if (image) {
            formData.append("picture", image.name);
        }

        const response = await fetch(`${baseUrl}/posts`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
        });
        const posts = await response.json();
        dispatch(setPosts({ posts }));

        // reset data
        setImage(null);
        setDesc("");
        setIsImage(false);
    };


    return (
        <Card sx={{ margin: 5, boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)", padding: 2 }}>
            {/* TEXT */}
            <Box display="flex" gap={2} alignItems="center" >
                <UserAvatar
                    image={user.avatar}
                    size="55px"
                    onClick={() => {
                        navigate(`/profile/${userId}`);
                        navigate(0);
                    }}
                />
                <Box
                    sx={{ width: "100%", }}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    gap="1rem"
                >
                    <SearchBar>
                        <InputBase
                            placeholder={`What's on your mind, ${user.firstName}`}
                            onChange={(e) => setDesc(e.target.value)}
                            value={desc}
                            sx={{
                                width: "100%"
                            }}
                        />
                        <IconButton
                            disabled={!desc}
                            onClick={handleSubmit}>
                            <SendOutlined />
                        </IconButton>
                    </SearchBar>

                    <Box
                        onClick={() => setIsImage(!isImage)}>
                        <ImageOutlined sx={{ fontSize: "36px", fontWeight: "light", "&:hover": { cursor: "pointer", } }} />
                    </Box>
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
                                sx={{ width: "100%" }}
                                gap={1}>
                                <Box
                                    {...getRootProps()}
                                    border={`1px solid rgba(255, 0, 0, 0.5)`}
                                    borderRadius="5px"
                                    p="1rem"
                                    width="100%"
                                    height="50px"
                                    sx={{ "&:hover": { cursor: "pointer" } }}   >
                                    <input {...getInputProps()} />
                                    <Box
                                        display="flex"
                                        height="100%"
                                        alignItems="center"
                                        borderColor="rgba(255, 0, 0, 0.5)"  >
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
                                                    <EditOutlined sx={{ color: "rgba(255, 0, 0, 0.5)" }} />
                                                </Box>
                                            )}
                                    </Box>
                                </Box>
                                {image && (
                                    <IconButton
                                        onClick={() => setImage(null)}
                                        sx={{ color: "rgba(255, 0, 0, 0.5)" }}   >
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