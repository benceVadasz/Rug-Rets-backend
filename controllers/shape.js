import PostShape from "../models/Shape.js";
import mongoose from 'mongoose';

export const getShapes = async (req, res) => {
    try {
        const designs = await PostShape.find();

        res.status(200).json(designs)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export const uploadShape = async (req, res) => {
    const shape = req.body;
    const newShape = new PostShape({...shape, user: req.userId, createdAt: new Date().toISOString()})

    try {
        await newShape.save();

        res.status(201).json(newShape);
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const deleteShape = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostShape.findByIdAndRemove(id);

    res.json({ message: "Shape deleted successfully." });
}