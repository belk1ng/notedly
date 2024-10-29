import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import gravatar from 'gravatar';

export const Mutation = {
    async signUp(_, {username, email, password}, {models}) {
        email = email.trim().toLowerCase();
        username = username.trim()

        const hashed = await bcrypt.hash(password, 10)
        const avatar = gravatar.url(email)

        try {
            const user = await models.user.create({
                email,
                username,
                password: hashed,
                avatar
            });

            return jwt.sign({id: user._id}, process.env.JWT_SECRET, {})
        } catch (error) {
            console.log(error)
            throw new Error('Error while creating account')
        }
    },
    async signIn(_, {email, username, password}, {models}) {
        email = email.trim().toLowerCase();
        username = username.trim()

        try {
            const user = await models.user.findOne({
                $or: [{email, username}]
            })
            if (!user) {
                throw new Error('User does not exist')
            }

            const valid = await bcrypt.compare(password, user.password);
            if (!valid) {
                throw new Error('Wrong credentials were passed')
            }

            return jwt.sign({id: user._id}, process.env.JWT_SECRET, {})
        } catch (error) {
            console.log(error)
        }
    },

    async newNote(_, {content}, {models}) {
        return models.note.create({
            content: content,
            author: "Dmitry Belkin",
        })
    },
    async updateNote(_, {noteId, content}, {models}) {
        return models.note.findOneAndUpdate({
            _id: noteId,
        }, {
            content: content
        }, {
            new: true
        });
    },
    async deleteNote(_, {noteId}, {models}) {
        try {
            await models.note.findOneAndDelete({
                _id: noteId
            })
            return true
        } catch (error) {
            console.log(error)
            return false;
        }
    },
}
