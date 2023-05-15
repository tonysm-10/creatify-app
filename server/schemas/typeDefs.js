const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
  }

  type Store {
    _id: ID
    storeName: String
    colorBackground: String
    phoneNumber: Number
    email: String
    storeLogo: String
    createdAt: Date
    products: [Product]!
  }

  type Product {
    _id: ID
    name: String
    description: String
    price: Number
    quantity: Number
    image: String
    category: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    stores: [Store]
    store(_id: ID!): Store
    products: [Product]
    product(_id: ID!): Product
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addStore(
      storeName: String!
      colorBackground: String!
      phoneNumber: Number!
      email: String!
      storeLogo: String!
    ): Store
    updateStore(
      _id: ID!
      storeName: String
      colorBackground: String
      phoneNumber: Number
      email: String
      storeLogo: String
    ): Store
    deleteStore(_id: ID!): Store
    addProduct(
      name: String!
      description: String!
      price: Number!
      image: String!
      category: String!
    ): Product
    updateProduct(
      _id: ID!
      name: String
      description: String
      price: Number
      imageUrl: String
      category: String
    ): Product
    deleteProduct(_id: ID!): Product
    addComment(_id: ID!, commentText: String!): Product
    removeComment(_id: ID!, commentId: ID!): Product
  }
`;

module.exports = typeDefs;
