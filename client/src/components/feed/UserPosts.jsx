import React, { useEffect } from 'react';
import { Post } from '../Post';
import { Box } from '@mui/material';
// import { setPosts } from '../features/postReducer';
import { setPosts } from '../../features/authReducer';
import { useDispatch, useSelector } from 'react-redux';

export const UserPosts = ({ userId }) => {
    const baseUrl = "http://localhost:3001";

    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const posts = useSelector((state) => state.posts);


    const getUserPosts = async () => {
        const response = await fetch(
            `${baseUrl}/posts/${userId}`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
    }

    useEffect(() => {
        getUserPosts();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (

        < Box flex={4}>
            {
                posts.map(
                    ({
                        _id,
                        userId,
                        firstName,
                        lastName,
                        avatar,
                        picture,
                        description,
                        location,
                        likes,
                        comments
                    }) => {
                        return (
                            <Post
                                key={_id}
                                postId={_id}
                                userId={userId}
                                name={`${firstName} ${lastName}`}
                                avatar={avatar}
                                picture={picture}
                                description={description}
                                location={location}
                                likes={likes}
                                comments={comments} />
                        )
                    })
            }
        </Box >
    )
}
