import styled from '@emotion/styled'
import { AppBar, Avatar, Badge, Box, IconButton, InputBase, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import PetsIcon from '@mui/icons-material/Pets';
import { Mail, Notifications, Search } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../features/authReducer";

const StyledToolbar = styled(Toolbar)({
    backgroundColor: "white",
    color: "black",
    display: "flex",
    justifyContent: "space-between"
});

const SearchBar = styled(Box)(({
    backgroundColor: "#edf0f2",
    padding: "0 20px",
    width: "40%",
    borderRadius: "30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& input": {
        fontSize: "14px",
    },
}));

const Icons = styled(Box)(({ theme }) => ({
    display: "none",
    alignItems: "center",
    gap: "20px",
    [theme.breakpoints.up("sm")]: {
        display: "flex"
    }
}));

const UserAvatar = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
        display: "none"
    }
}));

function Navbar() {

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    return (
        <AppBar position='fixed' >
            <StyledToolbar>
                {/* LOGO TEXT */}
                <Typography
                    variant="h6"
                    onClick={() => navigate("/home")}
                    sx={{
                        display: { xs: "none", sm: "block" },
                        "&:hover": {
                            cursor: "pointer",
                        },
                    }}>
                    NETSPIRE
                </Typography>

                {/* LOGO ICON */}
                <PetsIcon
                    onClick={() => navigate("/home")}
                    sx={{
                        display: { xs: "block", sm: "none " },
                        "&:hover": {
                            cursor: "pointer",
                        },
                    }} />

                {/* SEARCH BAR */}
                <SearchBar>
                    <InputBase placeholder='Search'
                        sx={{
                            width: '100%',
                        }} />
                    <IconButton>
                        <Search />
                    </IconButton>
                </SearchBar>

                {/* ICONS */}
                <Icons>
                    <Badge badgeContent={4} color="error">
                        <Mail />
                    </Badge>
                    <Badge badgeContent={2} color="error">
                        <Notifications />
                    </Badge>
                    <Avatar
                        onClick={(e) => setOpen(true)}
                        src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        // src={user.avatar}
                        sx={{ width: 30, height: 30 }} />
                </Icons>

                {/* AVATAR ONLY - XS SCREEN */}
                <UserAvatar onClick={(e) => setOpen(true)}>
                    <Avatar
                        src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        // src={user.avatar}
                        sx={{ width: 30, height: 30 }} />
                </UserAvatar>
            </StyledToolbar>

            {/* DROPDOWN LIST */}
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                open={open}
                onClose={(e) => setOpen(false)}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}  >
                <MenuItem onClick={() => navigate(`/profile/${user._id}`)}>Profile</MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>Logout</MenuItem>
            </Menu>
        </AppBar>
    )
}

export default Navbar