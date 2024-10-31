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

    async notes(_, __, {models}) {
        return models.note.find();
    },
    async notesFeed(_, {cursor, limit = 10}, {models}) {
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
    async note(_, {noteId}, {models}) {
        return models.note.findById(noteId);
    }
}
