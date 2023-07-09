import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Grid } from '@mui/material';
import { useDispatch } from "react-redux";
import { setLogin } from "../features/authReducer";

export const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        const loggedIn = await loggedInResponse.json();

        if (loggedIn) {
            dispatch(
                setLogin({
                    user: loggedIn.user,
                    token: loggedIn.token,
                })
            );
            navigate("/home");
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                height: '90vh',
                width: '35vw',
                align: "center",
                justifyContent: 'center',
                border: '1px solid #ccc',
            }}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} sx={{ p: 6 }}>
                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                        <Typography variant='h6'
                            sx={{ marginBottom: 4 }}>
                            LOGIN
                        </Typography>
                    </Grid>

                    {/* INPUT FIELDS */}
                    <Grid item xs={12}>
                        <TextField
                            name="email"
                            label="Email"
                            variant="outlined"
                            fullWidth
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ marginBottom: 4 }} >
                        <TextField
                            name="password"
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Grid>

                    {/* LOGIN BUTTON */}
                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                        <Button type="submit" variant="contained" color="primary">
                            Login
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};