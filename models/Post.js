import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    message: String,
    selectedFile: String,
    user: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const Post = mongoose.model('post', postSchema)
export default Post;