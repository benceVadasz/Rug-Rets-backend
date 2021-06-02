import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    name: String,
    file: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const postDesign = mongoose.model('postDesign', postSchema)
export default postDesign;