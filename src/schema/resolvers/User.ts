import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../../models/User'

const {UserInputError} = require('apollo-server');

const defaultUser = {
    email: "", password: ""
}

const defaultNewUser = {
    username: "",
    givenName: "",
    familyName: "",
    email: "",
    password: "",
    confirmPassword: ""
}

module.exports = {
    Mutation: {
        async login(_: any, {email, password} = defaultUser) {
            const existingUser = await User.findOne({email});
            if (!existingUser) return ({message: "User does not exist"});

            const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
            if (!isPasswordCorrect) {
                throw new UserInputError('Errors', {"message": "Invalid credentials"});
            }

            const token = jwt.sign({email: existingUser.email, id: existingUser._id},
                'test', {expiresIn: '1h'})

            return {
                ...existingUser._doc,
                id: existingUser._id,
                token
            };
        },
        async register(_: any, registeredUser = defaultNewUser) {

            const {username, givenName, familyName, email, password, confirmPassword} = registeredUser

            const existingUser = await User.findOne({email});
            if (existingUser) {
                throw new UserInputError('Username is taken', {
                    errors: {
                        username: 'This username is taken'
                    }
                });
            }

            if (password !== confirmPassword) {
                throw new UserInputError('Passwords', {
                    errors: {
                        password: 'Passwords do not match'
                    }
                });
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            const result = await User.create({username, givenName, familyName, password: hashedPassword, email});

            const token = jwt.sign({email: result.email, id: result._id},
                'test', {expiresIn: '1h'});

            return {
                result,
                token
            };
        }
    }
};
