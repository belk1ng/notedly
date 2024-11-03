import {GraphQLError} from 'graphql';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import gravatar from 'gravatar';
import {Types} from "mongoose";
import RedisGlobalInstance from "../utils/RedisClient.js";
import {ErrorVariant} from "../constants/errors.js";

export const Mutation = {
    async register(_, {username, email, password}, {models}) {
        email = email?.trim()?.toLowerCase();
        username = username?.trim()

        const hashed = await bcrypt.hash(password, 10)
        const avatar = gravatar.url(email)

        try {
            const user = await models.user.create({
                email, username, password: hashed, avatar
            });

            const [accessToken, refreshToken] = await Promise.all([
                jwt.sign({id: user._id}, process.env.JWT_SECRET, {}),
                jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '30d'})
            ])

            await RedisGlobalInstance.client.set(refreshToken, user._id, {
                "EX": 30 * 24 * 60 * 60
            })

            return {
                accessToken,
                refreshToken,
            }
        } catch (error) {
            console.log(error)
            throw new GraphQLError('Error while creating account', {
                extensions: {
                    code: ErrorVariant.UnexpectedError
                }
            })
        }
    },
    async login(_, {email, username, password}, {models}) {
        email = email?.trim()?.toLowerCase();
        username = username?.trim()

        try {
            const user = await models.user.findOne({
                $or: [{email}, {username}]
            })
            if (!user) {
                throw new GraphQLError('User does not exist', {
                    extensions: {
                        code: ErrorVariant.NotFoundError,
                        http: {
                            status: 404,
                        }

                    },
                })
            }

            const valid = await bcrypt.compare(password, user.password);
            if (!valid) {
                throw new GraphQLError('Wrong credentials were passed', {
                    extensions: {
                        code: ErrorVariant.ForbiddenError,
                        http: {
                            status: 400,
                        }

                    },
                })
            }

            const [accessToken, refreshToken] = await Promise.all([
                jwt.sign({id: user._id}, process.env.JWT_SECRET),
                jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '30d'})
            ])

            await RedisGlobalInstance.client.SET(refreshToken, user.id, {EX: 30 * 24 * 60 * 60,})

            return {
                accessToken,
                refreshToken,
            }

        } catch (error) {
            console.log(error)
            throw new GraphQLError('Error while signing in', {
                extensions: {
                    code: ErrorVariant.UnexpectedError
                }
            })
        }
    },
    async refresh(_, {refreshToken}, {models}) {
        const userId = await RedisGlobalInstance.client.get(refreshToken);
        if (!userId) {
            throw new GraphQLError('Invalid refresh token', {
                extensions: {
                    code: ErrorVariant.AuthenticationError,
                    http: {
                        status: 401,
                    }
                },
            });
        }

        const user = await models.user.findById(userId);
        if (!user) {
            throw new GraphQLError('The user not found', {
                extensions: {
                    code: ErrorVariant.NotFoundError,
                    http: {
                        status: 404,
                    }
                },
            });
        }

        const [newAccessToken, newRefreshToken] = await Promise.all([
            jwt.sign({id: user._id}, process.env.JWT_SECRET),
            jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '30d'})
        ])

        await Promise.all([
            RedisGlobalInstance.client.del(refreshToken),
            RedisGlobalInstance.client.SET(newRefreshToken, user.id, { EX: 30 * 24 * 60 * 60 })
        ])

        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        }
    },

    async addNote(_, {content}, {models, user}) {
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
                    code: ErrorVariant.ForbiddenError,
                    http: {
                        status: 403,
                    }
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
    async toggleFavoriteNote(_, {noteId}, {models, user}) {
        if (!user) {
            throw new GraphQLError('You must be signed in to toggle favorite notes', {
                extensions: {
                    code: ErrorVariant.AuthenticationError,
                    http: {
                        status: 401,
                    }
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
                    code: ErrorVariant.UnexpectedError,
                    http: {
                        status: 500
                    }
                }
            })
        }
    }
}
