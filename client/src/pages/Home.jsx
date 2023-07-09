import { Box, Stack } from '@mui/material'
import React from 'react'
import Navbar from '../components/Navbar'
import { Sidebar } from "../components/sidebar/Sidebar";
import { Feed } from "../components/feed/Feed";
import { Rightbar } from "../components/Rightbar";
import { NewPost } from '../components/NewPost';

export const Home = () => {
    return (
        <Box>
            <Navbar />
            <Stack direction='row' spacing-={2} justifyContent='space-between' sx={{ marginTop: '100px' }}>
                <Sidebar />
                <Box flex={4}>
                    <NewPost />
                    <Feed />
                </Box>
                <Rightbar />
            </Stack>
        </Box>
    )
}
