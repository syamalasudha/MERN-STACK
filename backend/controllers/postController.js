const Post = require('../models/Post.js');
const User = require('../models/user.js');
const createPost = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('fullName');
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const post = await Post.create({
            ...req.body,
            author: user.fullName,
            authorId: user._id
        });
        res.status(201).json({
            message: "Post Created Successfully",
            post

        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to create post",
            error: error.message

        });

    }
};
const getPosts = async (req, res) => {
    try {
        const post = await Post.find();
        res.status(200).json(post);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch post",
            error: error.message
        });

    }
};
const getPostById = async (req, res) => {
    try {
        const post = await Post.getPostById(req.params.id);
        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });


        }
        res.status(200).json(post);
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to fetch post",
            error: error.message
        });

    }
};
const updatePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true

        });
        if (!post) {
            res.status(404).json({
                message: "Post not found"
            });
        }
        res.status(200).json({
            message: "Post Updated Successfully",
            post
        });


    } catch (error) {

        res.status(500).json({
            message: "Failed to Update post",
            error: error.message
        });



    }
};
const deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            })
        }
        res.status(200).json({
            message: "Post Deleted Successfully"
        })

    } catch (error) {
        res.status(500).json({
            message: "Failed to Delete post",
            error: error.message
        });

    }
}



module.exports = {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost
};