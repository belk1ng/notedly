import bcrypt from "bcrypt";
import gravatar from "gravatar";
import { Types } from "mongoose";
import RedisClient from "../services/RedisClient.js";
import TokenService from "../services/TokenService.js";
import {
  GraphQLAuthenticationError,
  GraphQLForbiddenError,
  GraphQLNotFoundError,
  GraphQLUnexpectedError,
} from "../constants/errors.js";
import { authenticate } from "../utils/auth.js";

export const Mutation = {
  register: async (_, { username, email, password }, { models }) => {
    email = email?.trim()?.toLowerCase();
    username = username?.trim();

    const hashed = await bcrypt.hash(password, 10);
    const avatar = gravatar.url(email);

    try {
      const user = await models.user.create({
        email,
        username,
        password: hashed,
        avatar,
      });

      const [accessToken, refreshToken] = await TokenService.generateTokens({
        id: user.id,
      });
      await TokenService.saveRefreshToken(refreshToken, user.id);

      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      console.log(error);
      throw new GraphQLUnexpectedError(
        "Unexpected error while creating account",
      );
    }
  },
  login: async (_, { email, username, password }, { models }) => {
    email = email?.trim()?.toLowerCase();
    username = username?.trim();

    try {
      const user = await models.user.findOne({
        $or: [{ email }, { username }],
      });
      if (!user) {
        throw new GraphQLNotFoundError("User does not exist");
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new GraphQLAuthenticationError("Wrong credentials were passed");
      }

      const [accessToken, refreshToken] = await TokenService.generateTokens({
        id: user.id,
      });
      await TokenService.saveRefreshToken(refreshToken, user.id);

      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      console.log(error);
      throw new GraphQLUnexpectedError("Unexpected error while signing in");
    }
  },
  refreshTokens: async (_, { refreshToken }, { models }) => {
    const userId = await RedisClient.client.get(refreshToken);
    if (!userId) {
      throw new GraphQLAuthenticationError("Invalid refresh token");
    }

    const user = await models.user.findById(userId);
    if (!user) {
      throw new GraphQLNotFoundError("User does not exist");
    }

    const [newAccessToken, newRefreshToken] = await TokenService.generateTokens(
      {
        id: user.id,
      },
    );

    await Promise.all([
      TokenService.revokeRefreshToken(refreshToken),
      TokenService.saveRefreshToken(newRefreshToken, user.id),
    ]);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  },

  addNote: authenticate(async (_, { content }, { models, user }) => {
    return models.note.create({
      content: content,
      author: new Types.ObjectId(user.id),
    });
  }),
  updateNote: authenticate(async (_, { noteId, content }, { models, user }) => {
    const note = await models.note.findById(noteId);
    if (note && note.author.toString() !== user.id) {
      throw new GraphQLForbiddenError(
        "You dont have permission to update the note",
      );
    }

    return models.note.findOneAndUpdate(
      {
        _id: noteId,
      },
      {
        content: content,
      },
      {
        new: true,
      },
    );
  }),
  deleteNote: authenticate(async (_, { noteId }, { models, user }) => {
    const note = await models.note.findById(noteId);
    if (note && note.author.toString() !== user.id) {
      throw new GraphQLForbiddenError(
        "You dont have permission to delete the note",
      );
    }

    try {
      await models.note.findByIdAndDelete(note.id);
      return true;
    } catch (error) {
      console.log(error);
      throw new GraphQLUnexpectedError(
        "Unexpected error while deleting the note",
      );
    }
  }),
  toggleFavoriteNote: authenticate(async (_, { noteId }, { models, user }) => {
    const note = await models.note.findById(noteId);
    const isFavorite = note.favoriteBy.indexOf(user.id) !== -1;

    try {
      if (isFavorite) {
        return models.note.findByIdAndUpdate(
          noteId,
          {
            $pull: {
              favoriteBy: new Types.ObjectId(user.id),
            },
            $inc: {
              favoriteCount: -1,
            },
          },
          {
            new: true,
          },
        );
      } else {
        return models.note.findByIdAndUpdate(
          noteId,
          {
            $push: {
              favoriteBy: new Types.ObjectId(user.id),
            },
            $inc: {
              favoriteCount: 1,
            },
          },
          {
            new: true,
          },
        );
      }
    } catch (error) {
      console.log(error);
      throw new GraphQLUnexpectedError(
        "Unexpected error while toggling favorite flag",
      );
    }
  }),
};
