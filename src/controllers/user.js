import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User.js'
import mongoose from "mongoose";

export const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne( {email});
        console.log(existingUser)
        if (!existingUser) return res.status(404).json({message: "User does not exist"});

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" })

        const token = jwt.sign({email: existingUser.email, id: existingUser._id},
                                    'test', {expiresIn: '1h'})

        res.status(200).json({result: existingUser, token})
    }

    catch (e) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}

export const signUp = async (req, res) => {
    const { username, givenName, familyName, email, password, confirmPassword } = req.body;

    try {
        const existingUser = await User.findOne( {email});
        if (existingUser) return res.status(400).json({message: "User already exists"});

        if (password !== confirmPassword) return res.status(400).json({message: "Password do not match"});

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({username, givenName, familyName, password: hashedPassword, email});

        const token = jwt.sign({email: result.email, id: result._id},
            'test', {expiresIn: '1h'});

        res.status(200).json({result, token})
    }
    catch (e) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}

export const updateProfile = async (req, res) => {
    const { id } = req.params;
    const { username, givenName, familyName, email, phone } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedProfile = { username, givenName, familyName, email, phone, _id: id };

    await User.findByIdAndUpdate(id, updatedProfile, { new: true });

    res.json({"result": updatedProfile});
}

export const validateCredentials = async (req, res) => {
    const { email, password } = req.body;
    console.log(email)

    const existingUser = await User.findOne( {email});
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" })
}