import { Box, CardHeader, IconButton } from '@mui/material';
import React from 'react'
import { Avatar as UserAvatar } from './Avatar'
import { MoreVert } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFollowings } from '../features/authReducer';


export const PostHeader = ({ userId, name, avatar, location }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const followings = useSelector((state) => state.user.followings);
    const isFollowed = followings.find((following) => following._id === userId);

    const addRemoveFollowing = async () => {
        const response = await fetch(
            `http://localhost:3001/users/${_id}/${userId}`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        const data = await response.json();
        dispatch(setFollowings({ followings: data }));
    };

    return (
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
                    <IconButton aria-label="settings">
                        <MoreVert />
                    </IconButton>
                </Box >
            }
            title={
                <Box
                    display="flex"
                    alignItems="center"
                    gap={4} >
                    < span
                        onClick={() => {
                            navigate(`/profile/${userId}`);
                            navigate(0);
                        }}
                        style={{ cursor: "pointer", fontWeight: "bold", fontSize: "16px" }}>
                        {name}
                    </span >
                    < div
                        onClick={() => addRemoveFollowing()}
                        sx={{ p: "0.6rem" }} >
                        {
                            _id !== userId && (isFollowed ? (
                                < span
                                    style={{ color: "#008ad3", cursor: "pointer", fontWeight: "bold", fontSize: "14px" }}>
                                    Unfollow
                                </span >
                            ) : (
                                < span
                                    style={{ color: "#008ad3", cursor: "pointer", fontWeight: "bold", fontSize: "14px" }}>
                                    Follow
                                </span >
                            ))
                        }
                    </div>
                </Box>
            }
            subheader={
                < span
                    style={{ fontSize: "12px" }}>
                    {location}
                </span >
            }
        />
    )
}
