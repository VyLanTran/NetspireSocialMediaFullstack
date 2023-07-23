import { useDispatch, useSelector } from "react-redux";
import { setFollowings } from "../../features/authReducer";
import { useEffect } from "react";
import { Box, ImageList, Typography } from "@mui/material";
import { Avatar } from "../Avatar";
import { Link, useNavigate } from "react-router-dom";
import { useBaseUrl } from '../../context/BaseUrlContext';

export const FollowingList = ({ userId }) => {
    const baseUrl = useBaseUrl();

    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const followings = useSelector((state) => state.user.followings);
    const navigate = useNavigate();

    const getFollowings = async () => {
        const response = await fetch(
            `${baseUrl}/users/${userId}/followings`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        const data = await response.json();
        dispatch(setFollowings({ followings: data }));

    };

    useEffect(() => {
        getFollowings();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
                    <Typography variant="h6">
                        Followings
                    </Typography>
                    <Link href="/followings" style={{ textDecoration: 'none', color: "blue" }}>
                        <Typography variant="body2">
                            See all {followings.length} followings
                        </Typography>
                    </Link>
                </Box>

                <ImageList cols={3} rowHeight={100} gap={12}>
                    {
                        followings.slice(0, 9).map(({
                            _id,
                            firstName,
                            lastName,
                            avatar
                        }) =>
                        (

                            <Avatar
                                key={_id}
                                image={avatar}
                                size="90px"
                                onClick={() => {
                                    navigate(`/profile/${_id}`);
                                    navigate(0);
                                }}
                                shape="square"
                                name={`${firstName}${" "}${lastName}`}
                                style={{ cursor: "pointer" }} />
                        ))
                    }
                </ImageList>
            </Box>
        </Box>
    )
}