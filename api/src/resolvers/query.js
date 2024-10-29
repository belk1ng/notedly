import {models} from "../models/index.js";

export const Query = {
    async notes() {
        return await models.note.find()
    },
    async note(_, args) {
        return await models.note.findById(args.noteId)
    }
}
