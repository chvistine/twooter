import {GraphQLString, GraphQLID, GraphQLObjectType} from 'graphql'

const userType = new GraphQLObjectType({
  name: 'userType',
  description: 'The type that describes a user.',
  fields: {
    id: {
      type: GraphQLID,
      description: "The user's ID number.",
      resolve: (user) => user.id
    },
    username: {
      type: GraphQLString,
      description: "The user's username.",
      resolve: (user) => user.username
    },
    displayUsername: {
      type: GraphQLString,
      description: "The user's username with original case preserved.",
      resolve: (user) => user.displayUsername
    },
    createdAt: {
      type: GraphQLString,
      description: "The date the user's account was created.",
      resolve: (user) => user.createdAt
    },
    updatedAt: {
      type: GraphQLString,
      description: "The date the user's account was last updated.",
      resolve: (user) => user.updatedAt
    }
  }
})

export default userType
