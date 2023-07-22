import PostModel from "../models/PostModel.js";
import UserModel from "../models/UserModel.js";

/** CREATE */
export const createPost = async (req, res) => {
    try {
        const { userId, picture, description, location } = req.body;
        // const { userId, description, picture } = req.body;
        const user = await UserModel.findById(userId);
        const newPost = new PostModel({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            avatar: user.avatar,
            picture,
            description,
            location: "",
            likes: {},
            comments: []
        })
        await newPost.save();

        const posts = await PostModel.find();
        res.status(201).json(posts);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}

/** READ */
export const getAllPosts = async (req, res) => {
    try {
        const posts = await PostModel.find().sort({ updatedAt: -1 });;
        res.status(200).json(posts);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const posts = await PostModel.find({ userId });
        res.status(200).json(posts);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

/** PATCH */
export const addRemoveLike = async (req, res) => {
    try {
        const { postId } = req.params;
        const { userId } = req.body;
        const post = await PostModel.findById(postId);
        const isLiked = post.likes.get(userId);     // either true or undefined

        if (isLiked) {
            post.likes.delete(userId);
        }
        else {
            post.likes.set(userId, true);
        }

        const updatedPost = await PostModel.findByIdAndUpdate(
            postId,
            { likes: post.likes },
            { new: true }
        );

        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

