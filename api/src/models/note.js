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
        },
        favoriteCount: {
            type: Number,
            default: 0,
        },
        favoriteBy: [{
            type: Types.ObjectId,
            ref: 'User',
        }]
    }, {
        timestamps: true,
    }
)

export const NoteModel = model("Note", NoteSchema)
