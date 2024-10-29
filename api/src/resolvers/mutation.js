export const Mutation = {
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
