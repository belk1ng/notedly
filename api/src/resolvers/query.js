import {models} from "../models/index.js";

export const Query = {
    async users(_, __, {models}) {
        return models.user.find();
    },
    async user(_, {username}, {models}) {
        return models.user.findOne({username});
    },
    async me(_, __, {models, user}) {
        return models.user.findById(user.id);
    },

    async notes() {
        return models.note.find();
    },
    async note(_, { noteId }) {
        return models.note.findById(noteId);
    }
}
