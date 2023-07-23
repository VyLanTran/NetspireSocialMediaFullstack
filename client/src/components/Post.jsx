import React, { useState } from 'react'
import { Favorite, FavoriteBorder, ChatBubbleOutline, BookmarkBorderOutlined, BookmarkOutlined } from '@mui/icons-material'
import { Box, Card, CardActions, CardContent, CardMedia, Checkbox, Divider, IconButton, Typography } from '@mui/material'
import IosShareIcon from '@mui/icons-material/IosShare';
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../features/authReducer";
import { PostHeader } from './PostHeader';
import { useBaseUrl } from "../context/BaseUrlContext"

export const Post = ({ postId, userId, name, avatar, picture, description, location, likes, comments }) => {

    const baseUrl = useBaseUrl();

    const dispatch = useDispatch();

    const currentUserId = useSelector((state) => state.user._id);
    const token = useSelector((state) => state.token);
    const [openComments, setOpenComments] = useState(false);
    const isLiked = Boolean(likes[currentUserId]);

    const addRemoveLike = async () => {
        const response = await fetch(`${baseUrl}/posts/${postId}/like`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: currentUserId }),
        });
        const data = await response.json();
        dispatch(updatePost({ post: data }));
    };

    return (
        <Card sx={{ margin: 5, boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)" }}>
            <PostHeader
                userId={userId}
                name={name}
                avatar={avatar}
                location={location} />

            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            {picture && <CardMedia
                component="img"
                height="20%"
                image={`${baseUrl}/assets/${picture}`}
                alt="image"
            />}

            <CardActions sx={{ display: "flex", flexDirection: "column", }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                    <Box sx={{ display: 'flex', gap: 1 }} >
                        {/* LIKE */}
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <IconButton
                                aria-label="favorite"
                                onClick={() => addRemoveLike()}
                                sx={{
                                    '&:hover': {
                                        boxShadow: 'none', // Remove the shadow when hovering
                                    },
                                }}>
                                {isLiked ? <Favorite sx={{ color: "red", fontSize: 26 }} /> : <FavoriteBorder sx={{ fontSize: 26 }} />}
                            </IconButton>
                            <Typography>{likes.size}</Typography>
                        </Box>

                        {/* COMMENT */}
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: "0.7rem" }}>
                            <IconButton
                                aria-label="comment"
                                onClick={() => setOpenComments(!openComments)}>
                                <ChatBubbleOutline />
                            </IconButton>
                            <Typography>{comments.size}</Typography>
                        </Box>

                        {/* SHARE */}
                        <IconButton aria-label="share">
                            <IosShareIcon sx={{ marginBottom: 1, fontSize: 26, marginLeft: 1 }} />
                        </IconButton>
                    </Box>

                    {/* SAVE POST */}
                    <Box>
                        <IconButton aria-label="save">
                            <Checkbox icon={<BookmarkBorderOutlined sx={{ fontSize: 28 }} />} checkedIcon={<BookmarkOutlined sx={{ color: "black", fontSize: 28 }} />} />
                        </IconButton>
                    </Box>
                </Box>

                {/* OPEN ALL COMMENTS */}
                {openComments && (
                    <Box sx={{ mt: "0.5rem", width: "100%" }} >
                        {comments.map((comment, index) => (
                            <CommentBlock
                                key={index}
                                comment={comment} />
                        ))}
                        <Divider />
                    </Box>
                )}
            </CardActions>

        </Card >
    )
}

const CommentBlock = ({ avatar, name, comment }) => {
    return (
        <Box sx={{ width: "100%" }}>
            <Typography sx={{ m: "0.5rem 0", pl: "1rem" }}>
                {comment}
            </Typography>
            <Divider />
        </Box>

    )
}