import Design from "../models/Design.js";

export const getDesigns = async (req, res) => {
    try {
        const userId = req.params.id;
        const color = await Design.find({user: userId});
        res.status(200).json(color)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export const saveDesign = async (req, res) => {
    const designData = req?.body;
    const newDesign = new Design({...designData, user: req.userId, createdAt: new Date().toISOString()})
    try {
        await newDesign.save();
        res.status(201).json(newDesign);
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}