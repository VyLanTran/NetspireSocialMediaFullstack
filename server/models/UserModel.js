import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            // default: "unknownAvatar.jpeg",
            default: ""
        },
        followings: {
            type: Array,
            default: []
        },
        followers: {
            type: Array,
            default: []
        },
    },
    { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;