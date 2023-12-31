import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const salt = await bcryptjs.genSalt();

export const userIds = [
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
];

const users = [
    {
        _id: userIds[0],
        firstName: "Ethan",
        lastName: "Walker",
        email: "ethanwalker@gmail.com",
        password: await bcryptjs.hash("ethan", salt),
        avatar: "ethan.jpeg",
        // followings: [userIds[1], userIds[2]],
        // followers: [userIds[1], userIds[3], userIds[4]],
        followings: [],
        followers: [],
    },
    {
        _id: userIds[1],
        firstName: "Isabella",
        lastName: "Morgan",
        email: "isabellamorgan@gmail.com",
        password: await bcryptjs.hash("isabella", salt),
        avatar: "isabella.jpeg",
        // followings: [userIds[0], userIds[4]],
        // followers: [userIds[0]],
        followings: [],
        followers: [],
    },
    {
        _id: userIds[2],
        firstName: "Caleb",
        lastName: "Thompson",
        email: "calebthompson@gmail.com",
        password: await bcryptjs.hash("caleb", salt),
        avatar: "caleb.jpeg",
        // followings: [userIds[4]],
        // followers: [userIds[0]],
        followings: [],
        followers: [],
    },
    {
        _id: userIds[3],
        firstName: "Ava",
        lastName: "Roberts",
        email: "avaroberts@gmail.com",
        password: await bcryptjs.hash("ava", salt),
        avatar: "ava.jpeg",
        // followings: [userIds[0]],
        // followers: [userIds[4]],
        followings: [],
        followers: [],
    },
    {
        _id: userIds[4],
        firstName: "Noah",
        lastName: "Foster",
        email: "noahfoster@gmail.com",
        password: await bcryptjs.hash("noah", salt),
        avatar: "noah.jpeg",
        // followings: [userIds[0], userIds[3]],
        // followers: [userIds[1], userIds[2]],
        followings: [],
        followers: [],
    }
];

export default users;