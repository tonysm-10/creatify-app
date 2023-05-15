const { AuthenticationError } = require('apollo-server-express');
const { User, Store, Product } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    stores: async () => {
      return Store.find().populate('products');
    },
    store: async (parent, { storeId }) => {
      return Store.findOne({ _id: storeId }).populate('products');
    },
    products: async () => {
      return Product.find();
    },
    product: async (parent, { productId }) => {
      return Product.findOne({ _id: productId });
    },
    me: async (parent, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addStore: async (parent, { storeName, colorBackground, phoneNumber, email, storeLogo }) => {
      if (context.user) {
        const store = await Store.create({
          storeName,
          colorBackground,
          phoneNumber,
          email,
          storeLogo,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { stores: store._id } }
        );

        return store;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addProduct: async (parent, { storeId, productName, productDescription, productPrice, productImage }) => {
      if (context.user) {
        const product = await Product.create({
          productName,
          productDescription,
          productPrice,
          productImage,
        });

        await Store.findOneAndUpdate(
          { _id: storeId },
          { $addToSet: { products: product._id } }
        );

        return product;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeProduct: async (parent, { productId }, context) => {
      if (context.user) {
        const product = await Product.findOneAndDelete({
          _id: productId,
        });

        await Store.findOneAndUpdate(
          { _id: product.store },
          { $pull: { products: product._id } }
        );

        return product;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
