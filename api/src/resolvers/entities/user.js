export const User = {
  async notes(user, _, { models }) {
    return models.note
      .find({
        author: user._id,
      })
      .sort({ _id: -1 });
  },
  async favoriteNotes(user, args, { models }) {
    return models.note.find({ favoriteBy: user._id }).sort({ _id: -1 });
  },
};
