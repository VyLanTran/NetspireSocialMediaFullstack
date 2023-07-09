import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            required: true
        },
        picture: String,
        description: String,
        location: String,
        likes: {
            type: Map,
            of: Boolean
        },
        comments: {
            type: Array,
            default: []
        }
    },
    { timestamps: true }
);

const PostModel = mongoose.model("Post", PostSchema);
export default PostModel