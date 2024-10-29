import {Schema, Types, model} from "mongoose";

const NoteSchema = new Schema({
        content: {
            type: String,
            required: true,
        },
        author: {
            type: Types.ObjectId,
            ref: 'User',
            required: true,
        }
    }, {
        timestamps: true,
    }
)

export const NoteModel = model("Note", NoteSchema)
