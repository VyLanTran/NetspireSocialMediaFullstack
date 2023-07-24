import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";

/** REGISTER */
const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password, avatar } = req.body;

        // Check if the email was already used to register
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(400).json({ error: "This email was already used to register" });
        }

        const salt = await bcryptjs.genSalt();
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new UserModel({ firstName, lastName, email, password: hashedPassword, avatar });
        await newUser.save();
        res.status(201).json(newUser);

        // const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
        // delete newUser.password;
        // res.status(200).json({ token, user: newUser });
    } catch (err) {
        res.status(500).json({ error: "Registration failed" });
    }
}

/** LOGIN */
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email: email });

        if (!user)
            return res.status(404).json({ error: "User not found" });

        const isValid = await bcryptjs.compare(password, user.password);
        if (!isValid)
            return res.status(401).json({ error: "Incorrect password" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ token, user });
    } catch (err) {
        res.status(500).json({ error: "Login failed" });
    }
}

export { register, login };