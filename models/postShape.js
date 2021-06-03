import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    name: String,
    file: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const postShape = mongoose.model('postShape', postSchema)
export default postShape;