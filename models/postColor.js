import mongoose from "mongoose";

const colorSchema = mongoose.Schema({
    name: String,
    value: String,
    user: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const postColor = mongoose.model('postColor', colorSchema)
export default postColor;