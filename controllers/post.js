import Post from "../models/Post.js";

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({'createdAt': -1});

        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const postData = req?.body;
    const newPost = new Post({...postData, user: req.userId, createdAt: new Date().toISOString()})
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}