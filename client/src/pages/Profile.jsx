import { Box, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Rightbar } from "../components/Rightbar";
import { UserPosts } from '../components/feed/UserPosts';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ProfileSidebar } from '../components/sidebar/ProfileSidebar';
import { NewPost } from '../components/NewPost';

export const Profile = () => {
    // const baseUrl = "http://localhost:3001";
    const baseUrl = "https://netspire-api.vercel.app";

    const [user, setUser] = useState(null);
    const { userId } = useParams();
    const currentUserId = useSelector((state) => state.user._id);
    const token = useSelector((state) => state.token);

    const getUser = async () => {
        const response = await fetch(`${baseUrl}/users/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);
    };

    useEffect(() => {
        getUser();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Box>
            <Navbar />
            <Stack direction='row' spacing-={2} justifyContent='space-between' sx={{ marginTop: '100px' }}>
                <ProfileSidebar userId={userId} />
                <Box flex={4}>
                    {userId === currentUserId && <NewPost />}
                    <UserPosts userId={userId} />
                </Box>
                <Rightbar />
            </Stack>
        </Box>
    )
}
