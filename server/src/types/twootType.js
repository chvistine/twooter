import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLID
} from 'graphql'
import userType from 'types/userType'

const twootType = new GraphQLObjectType({
  name: 'twootType',
  description: 'The type that describes a twoot.',
  fields: {
    id: {
      type: GraphQLID,
      description: "The twoot's ID number.",
      resolve: (twoot) => twoot.id
    },
    createdAt: {
      type: GraphQLString,
      description: 'The date the twoot was created.',
      resolve: (twoot) => twoot.createdAt
    },
    updatedAt: {
      type: GraphQLString,
      description: 'The date the twoot was last updated.',
      resolve: (twoot) => twoot.updatedAt
    },
    body: {
      type: GraphQLString,
      description: 'The text body of the twoot.',
      resolve: (twoot) => twoot.body
    },
    parentTwootID: {
      type: GraphQLID,
      description: 'The ID number for the twoot this twoot is a retwoot of.',
      resolve: (twoot) => twoot.parentTwootID
    },
    authorID: {
      type: GraphQLID,
      description: 'The ID number of the user who authored this twoot.',
      resolve: (twoot) => twoot.authorID
    },
    author: {
      type: userType,
      description: 'The user who authored the twoot.',
      resolve: (twoot) => twoot.author
    }
  }
})

export default twootType
