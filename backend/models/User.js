const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true
        },
        
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },
        posts: {
            type: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
            default: []
        },
        savedPosts: {
            type: [String],
            default: []
        }
    },
    {
        timestamps: true
    }
);

// module.exports = mongoose.model("User", userSchema);
const user =mongoose.model("user",userSchema);
module.exports=user;