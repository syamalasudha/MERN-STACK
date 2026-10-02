const Post = require('../models/Post.js');
const createPost = async (req, res) => {
    try {
        const post = await Post.create(req.body);
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
        const post = await post.getPostById(req.params.id);
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