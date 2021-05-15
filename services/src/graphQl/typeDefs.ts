import {gql} from 'apollo-server'

const typeDefs = gql`  
  
  type User {
    id: ID,
    name: String,
    email: String,
    accessToken: String,
    message: String,
    oldPassword: String, 
    newPassword: String, 
    resetPasswordToken: String  
  }

  type Book {
      id: ID,
      title: String,
      description: String,
      userId: String,
      message: String
      accessToken: String
  }
  
  type Query {
    users: [User!]!,
      
    user(id: Int!): User,
      
    login(email: String!, password: String!): User,
      
    fetchUser(accessToken: String!): User,

    fetchBooks(accessToken: String!): [Book!]!
  }

  type Mutation {
    createUser(
      name: String!,
      email: String!,
      password: String!
    ): User!,

    createBook(
        title: String!,
        description: String!,
        accessToken: String!
    ): Book!,
      
    recoverPassword(
      email: String!
    ): User!
      
    changePassword(
      oldPassword: String!, 
      newPassword:String!, 
      resetPasswordToken: String!  
    ): User!
      
  }
`
export default typeDefs