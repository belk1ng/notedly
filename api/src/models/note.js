import {Schema, model} from "mongoose";

const NoteSchema = new Schema({
        content: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        }
    }, {
        timestamps: true,
    }
)

export const NoteModel = model("Note", NoteSchema)
