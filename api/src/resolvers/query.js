

export const Query = {
    users: async(_, __, {models})  =>{
        return models.user.find();
    },
    user: async(_, {username}, {models})  =>{
        return models.user.findOne({username});
    },
    me: async(_, __, {models, user})  =>{
        return models.user.findById(user.id);
    },

    notes: async(_, __, {models})  =>{
        return models.note.find();
    },
    notesFeed: async(_, {cursor, limit = 10}, {models})  =>{
        let hasNextPage = false;

        let cursorQuery = {};

        if (cursor) {
            cursorQuery = {
                _id: {
                    $lt: cursor
                }
            }
        }

        const notes = await models.note.find(cursorQuery).sort({_id: -1}).limit(limit + 1);
        if (notes.length > limit) {
            hasNextPage = true;
            notes.splice(-1, 1);
        }

        const newCursor = hasNextPage ? notes[notes.length - 1]?._id ?? null : null;

        return {
            notes,
            cursor: newCursor,
            hasNextPage
        }
    },
    note: async(_, {noteId}, {models})  =>{
        return models.note.findById(noteId);
    }
}
