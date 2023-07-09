import React, { useState } from 'react'
import { Favorite, FavoriteBorder, MoreVert, PersonAddOutlined, PersonRemoveOutlined, ChatBubbleOutline, NearMeOutlined, BookmarkBorderOutlined, BookmarkOutlined } from '@mui/icons-material'
import { Box, Card, CardActions, CardContent, CardHeader, CardMedia, Checkbox, Divider, IconButton, Typography } from '@mui/material'
import { Avatar as UserAvatar } from './Avatar'
import { useNavigate } from "react-router-dom";
import IosShareIcon from '@mui/icons-material/IosShare';
import { useDispatch, useSelector } from "react-redux";
import { setFollowings } from '../features/authReducer';
// import { updatePost } from "../features/postReducer.js";
import { updatePost } from "../features/authReducer";

export const Post = ({ postId, userId, name, avatar, picture, description, location, likes, comments }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const authId = useSelector((state) => state.user._id);
    const token = useSelector((state) => state.token);
    const followings = useSelector((state) => state.user.followings);

    // const followed = followings.includes(userId);
    const followed = false;
    const [openComments, setOpenComments] = useState(false);
    const liked = Boolean(likes[authId]);


    const addRemoveFollowing = async () => {
        const response = await fetch(
            `http://localhost:3001/users/${authId}/${userId}`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        const data = await response.json();
        dispatch(setFollowings({ folloings: data }));
    };

    const addRemoveLike = async () => {
        const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: authId }),
        });
        const data = await response.json();
        dispatch(updatePost({ post: data }));
    };

    return (
        <Card sx={{ margin: 5, boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)" }}>
            <CardHeader
                avatar={
                    <UserAvatar
                        image={avatar} size="55px"
                        onClick={() => {
                            navigate(`/profile/${userId}`);
                            navigate(0);
                        }} />
                }
                action={
                    <Box>
                        < IconButton
                            onClick={() => addRemoveFollowing()}
                            sx={{ p: "0.6rem" }} >
                            {followed ? (
                                <PersonRemoveOutlined />
                            ) : (
                                <PersonAddOutlined />
                            )}
                        </IconButton>
                        <IconButton aria-label="settings">
                            <MoreVert />
                        </IconButton>
                    </Box>
                }
                title={
                    < span
                        onClick={() => {
                            navigate(`/profile/${userId}`);
                            navigate(0);
                        }}
                        style={{ cursor: "pointer" }}>
                        {name}
                    </span >
                }
                subheader={location}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            {picture && <CardMedia
                component="img"
                height="20%"
                image={`http://localhost:3001/assets/${picture}`}
                alt="image"
            />}

            <CardActions sx={{ display: "flex", flexDirection: "column", }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                    <Box sx={{ display: 'flex', gap: 1 }} >
                        {/* LIKE */}
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <IconButton
                                aria-label="favorite"
                                onClick={() => addRemoveLike()}>
                                {liked ? <Favorite sx={{ color: "red", fontSize: 26 }} /> : <FavoriteBorder sx={{ fontSize: 26 }} />}
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
            <Divider />
            <Typography sx={{ m: "0.5rem 0", pl: "1rem" }}>
                {comment}
            </Typography>
        </Box>

    )
}