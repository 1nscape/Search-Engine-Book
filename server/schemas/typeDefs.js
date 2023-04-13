const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    bookCount: Int
    email: String
    savedBooks: [Book]
  }


  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookData: BookInput!): User
    removeBook(DefsbookId: ID): User
  }


  type Auth {
    user: User
    token: ID!
    
  }


  type Query {
    me: User
  }


  type Book {
    bookId: ID
    authors: [String]
    description: String
    image: String
    title: String
  }


  input InputBook {
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String

  }



`;

module.exports = typeDefs;