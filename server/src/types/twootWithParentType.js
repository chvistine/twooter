import {GraphQLObjectType} from 'graphql'
import twootType from 'types/twootType'

const twootWithParentType = new GraphQLObjectType({
  name: 'twootWithParentType',
  description: 'The type that describes a twoot.',
  fields: {
    twoot: {
      type: twootType,
      description: 'The requested twoot.',
      resolve: (twoot) => twoot
    },
    parentTwoot: {
      type: twootType,
      description: 'The twoot the requested twoot is retwooting.',
      resolve: (twoot) => twoot.parentTwoot
    }
  }
})

export default twootWithParentType
