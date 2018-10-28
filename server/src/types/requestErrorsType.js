import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLList
} from 'graphql'
import errorEntryType from './errorEntryType'

const requestErrorsType = new GraphQLObjectType({
  name: 'requestErrorsType',
  description: 'The type that describes a request errors object.',
  fields: {
    name: {
      type: GraphQLString,
      description: 'The error name.',
      resolve: (errors) => errors.name
    },
    entries: {
      type: new GraphQLList(errorEntryType),
      description: 'The list of request errors.',
      resolve: (errors) => errors.entries
    }
  }
})

export default requestErrorsType
