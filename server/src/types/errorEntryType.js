import {GraphQLObjectType, GraphQLString} from 'graphql'

const errorEntryType = new GraphQLObjectType({
  name: 'errorEntryType',
  description: 'The type that describes a single error entry.',
  fields: {
    message: {
      type: GraphQLString,
      description: 'The error message.',
      resolve: (error) => error.message
    },
    type: {
      type: GraphQLString,
      description: 'The error type.',
      resolve: (error) => error.type
    },
    path: {
      type: GraphQLString,
      description: 'The path to the error.',
      resolve: (error) => error.path
    }
  }
})

export default errorEntryType
