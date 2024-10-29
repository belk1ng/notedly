import {GraphQLError} from 'graphql';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import gravatar from 'gravatar';
import {Types} from "mongoose";
import {ErrorVariant} from "../constants/errors.js";

export const Mutation = {
    async signUp(_, {username, email, password}, {models}) {
        email = email?.trim()?.toLowerCase();
        username = username?.trim()

        const hashed = await bcrypt.hash(password, 10)
        const avatar = gravatar.url(email)

        try {
            const user = await models.user.create({
                email, username, password: hashed, avatar
            });

            return jwt.sign({id: user._id}, process.env.JWT_SECRET, {})
        } catch (error) {
            console.log(error)
            throw new GraphQLError('Error while creating account', {
                extensions: {
                    code: ErrorVariant.UnexpectedError
                }
            })
        }
    },
    async signIn(_, {email, username, password}, {models}) {
        email = email?.trim()?.toLowerCase();
        username = username?.trim()

        try {
            const user = await models.user.findOne({
                $or: [{email}, {username}]
            })
            if (!user) {
                throw new GraphQLError('User does not exist', {
                    extensions: {
                        code: ErrorVariant.AuthenticationError,
                    },
                })
            }

            const valid = await bcrypt.compare(password, user.password);
            if (!valid) {
                throw new GraphQLError('Wrong credentials were passed', {
                    extensions: {
                        code: ErrorVariant.ForbiddenError,
                    },
                })
            }

            return jwt.sign({id: user._id}, process.env.JWT_SECRET, {})
        } catch (error) {
            console.log(error)
        }
    },

    async newNote(_, {content}, {models, user}) {
        if (!user) {
            throw new GraphQLError('You must be signed in to create a note', {
                extensions: {
                    code: ErrorVariant.AuthenticationError
                }
            })
        }

        return models.note.create({
            content: content,
            author: new Types.ObjectId(
                user.id
            )
        })
    },
    async updateNote(_, {noteId, content}, {models, user}) {
        if (!user) {
            throw new GraphQLError('You must be signed in to update the note', {
                extensions: {
                    code: ErrorVariant.AuthenticationError
                }
            })
        }

        const note = await models.note.findById(noteId);
        if (note && note.author.toString() !== user.id) {
            throw new GraphQLError('You dont have permission to update the note', {
                extensions: {
                    code: ErrorVariant.ForbiddenError
                }
            })
        }

        return models.note.findOneAndUpdate({
            _id: noteId,
        }, {
            content: content
        }, {
            new: true
        });
    },
    async deleteNote(_, {noteId}, {models, user}) {
        if (!user) {
            throw new GraphQLError('You must be signed in to delete the note', {
                extensions: {
                    code: ErrorVariant.AuthenticationError
                }
            })
        }

        const note = await models.note.findById(noteId);
        if (note && note.author.toString() !== user.id) {
            throw new GraphQLError('You dont have permission to delete the note', {
                extensions: {
                    code: ErrorVariant.ForbiddenError
                }
            })
        }

        try {
            await models.note.findByIdAndDelete(note.id)
            return true
        } catch (error) {
            console.log(error)
            return false;
        }
    },
    async toggleFavorite(_, {noteId}, {models, user}) {
        if (!user) {
            throw new GraphQLError('You must be signed in to toggle favorite notes', {
                extensions: {
                    code: ErrorVariant.AuthenticationError
                }
            })
        }

        const note = await models.note.findById(noteId);
        const isFavorite = note.favoriteBy.indexOf(user.id) !== -1

        try {
            if (isFavorite) {
                return models.note.findByIdAndUpdate(noteId, {
                    $pull: {
                        favoriteBy: new Types.ObjectId(user.id)
                    },
                    $inc: {
                        favoriteCount: -1
                    }
                }, {
                    new: true
                })
            } else {
                return models.note.findByIdAndUpdate(noteId, {
                    $push: {
                        favoriteBy: new Types.ObjectId(user.id)
                    },
                    $inc: {
                        favoriteCount: 1
                    }
                }, {
                    new: true
                })
            }
        } catch (error) {
            console.log(error);
            throw new GraphQLError('Unexpected error occurred', {
                extensions: {
                    code: ErrorVariant.UnexpectedError
                }
            })
        }
    }
}
