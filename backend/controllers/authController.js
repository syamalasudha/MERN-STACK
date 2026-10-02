const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Post = require("../models/Post");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "teaching-secret";

const signup = async (req, res) => {

    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({
            message: "Please fill all fields"
        });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).json({
            message: "User already exists"
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        fullName,
        email,
        password: hashedPassword
    });

    const token = jwt.sign(
        { userId: user._id },
        JWT_SECRET,
        { expiresIn: "1h" }
    );

    res.cookie("token", token, {
        httpOnly: true
    });

    res.status(201).json({
        message: "Signup successful",
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email
        }
    });
};


const login = async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }

    const passwordCorrect = await bcrypt.compare(
        password,
        user.password
    );

    if (!passwordCorrect) {
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }

    const token = jwt.sign(
        { userId: user._id },
        JWT_SECRET,
        { expiresIn: "1h" }
    );

    res.cookie("token", token, {
        httpOnly: true
    });

    res.json({
        message: "Login successful",
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email
        }
    });
};


const logout = (req, res) => {

    res.clearCookie("token");

    res.json({
        message: "Logged out"
    });
};


const getMe = async (req, res) => {

    const user = await User.findById(req.user.userId)
        .select("-password");

    res.json({
        user
    });
    
};

const savePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) return res.status(404).json({ message: "Post not found" });

        const user = await User.findById(req.user.userId);
        const postUrl = `/posts/${post._id}`;
        if (!user.savedPosts.includes(postUrl)) user.savedPosts.push(postUrl);
        await user.save();

        res.json({ savedPosts: user.savedPosts });
    } catch (error) {
        res.status(400).json({ message: "Could not save post" });
    }
};

const unsavePost = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        const postUrl = `/posts/${req.params.postId}`;
        user.savedPosts = user.savedPosts.filter(url => url !== postUrl);
        await user.save();

        res.json({ savedPosts: user.savedPosts });
    } catch (error) {
        res.status(400).json({ message: "Could not remove saved post" });
    }
};



const getUsers = async (req, res) => {

    const users = await User.find()
        .select("-password");

    res.json(users);
};




const updateUser = async (req, res) => {

    const user = await User.findById(req.user.userId);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    if (req.body.fullName) {
        user.fullName = req.body.fullName;
    }

    if (req.body.email) {
        user.email = req.body.email;
    }

    if (req.body.password) {
        user.password = await bcrypt.hash(
            req.body.password,
            10
        );
    }

    await user.save();

    res.json({
        message: "Profile updated",
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email
        }
    });
};


module.exports = {
    signup,
    login,
    logout,
    getMe,
    savePost,
    unsavePost,
    getUsers,
    updateUser
};