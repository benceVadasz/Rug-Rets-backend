import PostColor from "../models/postColor.js";
import mongoose from 'mongoose';

export const getColors = async (req, res) => {
    try {
        const userId = req.params.id;
        console.log('id', userId)
        const color = await PostColor.find({user: userId});
        console.log('colors', color)
        res.status(200).json(color)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export const uploadColor = async (req, res) => {
    const colorData = req?.body;

    const newColor = new PostColor({...colorData, user: req.userId, createdAt: new Date().toISOString()})
    try {
        await newColor.save();
        res.status(201).json(newColor);
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const deleteColor = async (req, res) => {
    const { id } = req.params;
    console.log('value', id)
    await PostColor.deleteOne({"_id": id});

    res.json({ message: "Shape deleted successfully." });
}