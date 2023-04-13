

const { signToken } = require("../utils/auth");
const { User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");


const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const dataUser = await User.findOne({ _id: context.user._id }).select( "-__v -password");

        return dataUser;
      }

      throw new AuthenticationError("Must be logged in!");
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
        if (!user) {
            throw new AuthenticationError('Email does not exist in the system, please try a new email.')
        }
        const correctPassword = await user.isCorrectPassword(password);
        if (!correctPassword) {
            throw new AuthenticationError('Password is incorrect')
        }
        const token = signToken (user);
    },
    addingUser: async (parent, args) => {
        const user = await User.create(args);
        const token = signToken(user);
        return {token, user};

    },
    savedBook: async (parent, { bookData }, context) => {
        if (context.user) {
            const userUpdate = await User.findByIdAndUpdate(
                { _id: context.user_.id },
                { $push: { savedBooks: bookData }},
                {new: true }
            );
            return userUpdate;
        }

        throw new AuthenticationError ('Please log in');
    },

    removedBook: async (parent, { bookId }, context) => {
        if (context.user) {
            const userUpdate = await User.findOneAndUpdate (
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId } } },
                { new: true }
                );

                return userUpdate;
        }
        throw new AuthenticationError ('Please log in');
    }
    

  }

}
  

module.exports = resolvers;
