const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        content: {
            type: String,
            required: true
        },

        author: {
            type: String,
            required: true
        },

        authorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        category: {
            type: String,
            required: true
        },

        readTime: {
            type: Number,
            required: true,
            min: 1
        },

        image: {
            type: String,
            default: ""
        },

        tags: {
            type: [String],
            default: []
        },

        published: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

const post = mongoose.model("post", postSchema);

module.exports = post;