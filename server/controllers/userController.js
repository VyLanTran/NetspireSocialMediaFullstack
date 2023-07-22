import UserModel from "../models/UserModel.js";

/** READ */
export const getUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await UserModel.findById(userId);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const getUserFollowings = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await UserModel.findById(userId);

        const data = await Promise.all(
            user.followings.map((followingId) => UserModel.findById(followingId))
        );
        const followingList = data.map(
            ({ _id, firstName, lastName, avatar }) => {
                return { _id, firstName, lastName, avatar };
            }
        );
        res.status(200).json(followingList);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const getUserFollowers = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await UserModel.findById(userId);

        const followerList = await Promise.all(
            user.followers.map((followerId) => UserModel.findById(followerId))
        );
        res.status(200).json(followerList);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

/** PATCH */
export const addRemoveFollowing = async (req, res) => {
    try {
        const { userId, followingId } = req.params;
        const user = await UserModel.findById(userId);

        // Toggle between follow and unfollow
        if (user.followings.includes(followingId)) {
            // unfollow
            user.followings = user.followings.filter((id) => id !== followingId);
        }
        else {
            // follow
            user.followings.push(followingId);
        }

        await user.save();

        const followingList = await Promise.all(
            user.followings.map((followingId) => UserModel.findById(followingId))
        );
        const formattedFollowings = followingList.map(
            ({ _id, firstName, lastName, avatar }) => {
                return { _id, firstName, lastName, avatar };
            }
        );
        // res.status(200).json(followingList);
        res.status(200).json(formattedFollowings);

    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}