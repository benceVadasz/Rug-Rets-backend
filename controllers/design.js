import PostDesign from "../models/postDesign.js";

export const getDesigns = async (request, response) => {
    try {
        const designs = await PostDesign.find();
        console.log(designs)

        response.status(200).json(designs)
    } catch (error) {
        response.status(400).json({message: error.message})
    }
}

export const uploadDesign = async (request, response) => {
    const design = request.body;
    const newDesign = PostDesign(design)

    try {
        await newDesign.save();

        response.status(201).json(newDesign);
    } catch (error) {
        response.status(409).json({message: error.message})
    }
}