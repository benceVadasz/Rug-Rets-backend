import PostShape from "../models/postShape.js";
import mongoose from 'mongoose';

export const getShapes = async (req, res) => {
    try {
        const designs = await PostShape.find();
        console.log(designs)

        res.status(200).json(designs)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export const uploadShape = async (req, res) => {
    const design = req.body;
    const newDesign = new PostShape(design)

    try {
        await newDesign.save();

        res.status(201).json(newDesign);
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