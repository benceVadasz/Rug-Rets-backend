import Color from "../models/Color.js";
import mongoose from 'mongoose';

export const getColors = async (req, res) => {
    try {
        const userId = req.params.id;
        const color = await Color.find({user: userId});
        res.status(200).json(color)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export const uploadColor = async (req, res) => {
    const colorData = req?.body;

    const newColor = new Color({...colorData, user: req.userId, createdAt: new Date().toISOString()})
    try {
        await newColor.save();
        res.status(201).json(newColor);
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const deleteColor = async (req, res) => {
    const {id} = req.params;
    await Color.deleteOne({"_id": id});

    res.json({message: "Shape deleted successfully."});
}

export const checkIfColorExists = async (req, res) => {
    const hex = req?.body;
    const matches = await Color.find({value: hex.value});
    res.json({matches});
}