import mongoose from "mongoose";
import { userIds } from "./users.js";

const posts = [
    {
        _id: new mongoose.Types.ObjectId(),
        userId: userIds[1],
        firstName: "Isabella",
        lastName: "Morgan",
        avatar: "isabella.jpeg",
        picture: "beach.jpeg",
        description: "Summer time",
        location: "Clearwater Beach, Florida",
        likes: new Map([
            [userIds[0], true],
            [userIds[3], true],
        ]),

        comments: [
            "Looks like paradise! Enjoy every moment of your summer vacation!",
            "Amazing",
            "Summer vacation goals right here"
        ],
    },
    {
        _id: new mongoose.Types.ObjectId(),
        userId: userIds[4],
        firstName: "Noah",
        lastName: "Foster",
        avatar: "noah.jpeg",
        picture: "meal.jpeg",
        description: "What a wonderful meal. Thanks bae <3",
        location: "Dallas, TX",
        likes: new Map([
            [userIds[0], true],
            [userIds[1], true],
            [userIds[3], true],
        ]),

        comments: [
            "Aww, so sweet",
            "Looks amazing",
            "Love it"
        ],
    },
    {
        _id: new mongoose.Types.ObjectId(),
        userId: userIds[0],
        firstName: "Ethan",
        lastName: "Walker",
        avatar: "ethan.jpeg",
        picture: "basketball.jpeg",
        description: "Let's go Warriors",
        location: "San Francisco, CA",
        likes: new Map([
            [userIds[2], true],
            [userIds[1], true],
            [userIds[3], true],
        ]),

        comments: [
            "Wow, you got the ticket? Lucky you",
            "Watching it with my boys",
            "Big game",
        ],
    },
    {
        _id: new mongoose.Types.ObjectId(),
        userId: userIds[3],
        firstName: "Ava",
        lastName: "Roberts",
        avatar: "ava.jpeg",
        picture: "movie.webp",
        description: "Great show for a Friday night",
        location: "Atlanta, GA",
        likes: new Map([
            [userIds[0], true],
            [userIds[1], true],
        ]),

        comments: [
            "That's a good series",
            "My favorite show too",
            "My kids love Stranger things so much"
        ],
    },
    {
        _id: new mongoose.Types.ObjectId(),
        userId: userIds[2],
        firstName: "Caleb",
        lastName: "Thompson",
        avatar: "caleb.jpeg",
        picture: "las_vegas.jpeg",
        description: "Las Vegas, here we go",
        location: "Las Vegas, NV",
        likes: new Map([
            [userIds[0], true],
            [userIds[1], true],
            [userIds[3], true],
            [userIds[4], true],
        ]),

        comments: [
            "Nice pic, Caleb",
        ],
    },
];

export default posts;