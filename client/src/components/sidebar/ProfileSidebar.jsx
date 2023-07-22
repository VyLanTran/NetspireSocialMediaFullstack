import { Box, Divider, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Instagram, Twitter, LocationOn, WorkOutlined, School, Edit } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { FollowingList } from './FollowingList';

export const ProfileSidebar = ({ userId }) => {
    // const baseUrl = "http://localhost:3001";
    const baseUrl = "netspire-api.vercel.app";

    const [user, setUser] = useState(null);
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

    if (!user) {
        return null;
    }

    return (
        <Box
            flex={2}
            p={2}
            sx={{
                display: { xs: 'none', sm: 'block' },
                width: "100%",
            }}>

            {/* INTRO */}
            <IntroCard user={user} />

            < Divider />

            {/* FOLLOWINGS */}
            < FollowingList userId={userId} />
        </Box >
    )
}

const IntroCard = ({ user }) => {
    return (
        <Box
            sx={{
                width: "100%",
                border: "1px solid black",
                borderRadius: "4px",
                marginTop: "25px",
                bgcolor: "rgba(0, 0, 0, 0.05)",
                borderColor: 'rgba(0, 0, 0, 0.23)',
            }}>
            <Box sx={{ padding: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                    <Typography variant="h6">Intro</Typography>
                    <Edit fontSize="xs" />
                </Box>

                <Grid container spacing={2}>
                    <Grid item xs={2} justifyContent="center" alignItems="center">
                        <LocationOn fontSize="small" />
                    </Grid>
                    <Grid item xs={10}>
                        <Typography variant="body2">{user.firstName}{" "}{user.lastName}</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={2} justifyContent="center">
                        <WorkOutlined fontSize="small" />
                    </Grid>
                    <Grid item xs={10}>
                        <Typography variant="body2">f</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={2} justifyContent="center">
                        <School fontSize="small" />
                    </Grid>
                    <Grid item xs={10}>
                        <Typography variant="body2">Study at</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={2} justifyContent="center">
                        <Instagram fontSize="small" />
                    </Grid>
                    <Grid item xs={10}>
                        <Typography variant="body2">Study at</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={2} justifyContent="center">
                        <Twitter fontSize="small" />
                    </Grid>
                    <Grid item xs={10}>
                        <Typography variant="body2">Study at</Typography>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

