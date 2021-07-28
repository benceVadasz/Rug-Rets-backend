import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    name: String,
    file: String,
    user: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const shape = mongoose.model('shape', postSchema)
export default shape;