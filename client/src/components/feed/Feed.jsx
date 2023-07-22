import React, { useEffect } from 'react';
import { Post } from '../Post';
import { Box } from '@mui/material';
import { setPosts } from '../../features/authReducer';
import { useDispatch, useSelector } from 'react-redux';

export const Feed = () => {

  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const posts = useSelector((state) => state.posts);

  const getAllPosts = async () => {
    const response = await fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  }

  useEffect(() => {
    getAllPosts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box>
      {
        Array.isArray(posts) && posts.length > 0 ? (
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
            }) => (
              <Post
                key={_id}
                postId={_id}
                userId={userId}
                name={`${firstName} ${lastName}`}
                avatar={avatar}
                // name="random name"
                // avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg-3382ZgdUhzsOz0VYE8KVNtX_HTwTxRSps08Nli1&s"
                picture={picture}
                description={description}
                location={location}
                likes={likes}
                comments={comments} />
            )
          )
        ) : (
          <p>Loading posts...</p>
        )
      }
    </Box >
  )
}
