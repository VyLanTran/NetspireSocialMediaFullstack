import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Grid } from '@mui/material';
import Dropzone from "react-dropzone";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useDispatch } from 'react-redux';
import { setLogin } from '../features/authReducer';
import { useNavigate } from 'react-router-dom';

export const Register = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [avatar, setAvatar] = useState('')
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("picturePath", avatar.name);

        const savedUserResponse = await fetch(
            "http://localhost:3001/auth/register",
            {
                method: "POST",
                body: formData,
            }
        );
        const savedUser = await savedUserResponse.json();

        // log in
        // if (savedUser) {
        //     dispatch(
        //         setLogin({
        //             user: savedUser.user,
        //             token: savedUser.token,
        //         })
        //     );
        //     navigate("/home");
        // }
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
                            REGISTER
                        </Typography>
                    </Grid>

                    {/* INPUT FIELDS */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="firstName"
                            label="First Name"
                            variant="outlined"
                            fullWidth
                            required
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="lastName"
                            label="Last Name"
                            variant="outlined"
                            fullWidth
                            required
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </Grid>
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
                    <Grid item xs={12}>
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

                    {/* UPLOAD IMAGE */}
                    <Grid item xs={12} sx={{ marginBottom: 4 }}>
                        <Box>
                            <Dropzone
                                acceptedFiles=".jpg,.jpeg,.png"
                                multiple={false}
                                onDrop={(acceptedFiles) =>
                                    setAvatar(acceptedFiles[0])
                                }
                            >
                                {({ getRootProps, getInputProps }) => (
                                    <Box
                                        {...getRootProps()}
                                        sx={{

                                            border: '1px solid',
                                            borderColor: 'rgba(0, 0, 0, 0.23)',
                                            borderRadius: '4px',
                                            paddingX: '0.7rem',
                                            fontSize: '1rem',
                                            outline: 'none',
                                            '&:hover': {
                                                borderColor: 'rgba(0, 0, 0, 0.87)',
                                            },
                                            color: 'rgba(0, 0, 0, 0.6)',
                                        }}
                                    >
                                        <input {...getInputProps()} />
                                        {!avatar ? (
                                            <p>Upload Image</p>
                                        ) : (
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <p>{avatar.name}</p>
                                                <EditOutlinedIcon />
                                            </Box>
                                        )}
                                    </Box>
                                )}
                            </Dropzone>
                        </Box>
                    </Grid>

                    {/* REGISTER BUTTON */}
                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                        <Button type="submit" variant="contained" color="primary">
                            Register
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};