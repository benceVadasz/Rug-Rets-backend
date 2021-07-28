import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../../models/User.js'
import {UserInputError} from 'apollo-server'
import mongoose from "mongoose";

function generateToken(user) {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            username: user.username
        },
        'test',
        { expiresIn: '1h' }
    );
}

export default {
    Mutation: {
        async login(_, { email, password }) {
            try {
                const existingUser = await User.findOne( {email});

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
        },
        async register(
            _,
            {
                registerInput: { username, email, password, confirmPassword }
            }
        ) {
            // Validate user data
            const { valid, errors } = validateRegisterInput(
                username,
                email,
                password,
                confirmPassword
            );
            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }
            // TODO: Make sure user doesnt already exist
            const user = await User.findOne({ username });
            if (user) {
                throw new UserInputError('Username is taken', {
                    errors: {
                        username: 'This username is taken'
                    }
                });
            }
            // hash password and create an auth token
            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            });

            const res = await newUser.save();

            const token = generateToken(res);

            return {
                ...res._doc,
                id: res._id,
                token
            };
        }
    }
};