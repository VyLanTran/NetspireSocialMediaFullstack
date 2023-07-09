import { Box, Typography } from "@mui/material";

export const Avatar = ({ image, size, shape = "circle", name, onClick }) => {
    return shape === "circle" ?
        (<Box width={size} height={size}>
            <img
                style={{ objectFit: "cover", borderRadius: "50%", cursor: "pointer" }}
                width={size}
                height={size}
                alt="user"
                src={`http://localhost:3001/assets/${image}`}
                onClick={onClick}
            />
        </Box>) :
        (<Box width={size} display="flex" flexDirection="column" alignItems="center" gap={1}>
            <img
                style={{ objectFit: "cover", borderRadius: "8%", cursor: "pointer" }}
                width={size}
                height={size}
                alt="user"
                src={`http://localhost:3001/assets/${image}`}
                borderRadius="20px"
                onClick={onClick}
            />
            <Typography fontSize="11px" fontWeight="bold" textAlign="center">{name}</Typography>
        </Box>)
};
