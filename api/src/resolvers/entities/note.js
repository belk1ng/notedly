export const Note = {
    async author(note, __, {models}) {
        return models.user.findById(note.author)
    },
    async favoriteBy(note, __, {models}) {
        return models.user.find({
            _id: {
                $in: note.favoriteBy
            }
        })
    }
}