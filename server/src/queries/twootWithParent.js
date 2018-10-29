import responseType from 'types/responseType'
import twootWithParentType from 'types/twootWithParentType'
import twootWithParentResolver from 'resolvers/twootWithParentResolver'
import {GraphQLID} from 'graphql'

const twootWithParent = {
  type: responseType(twootWithParentType, 'twoot', 'twootWithParent'),
  description: 'Retrieves a given twoot and its parent twoot.',
  args: {
    id: {
      type: GraphQLID,
      description: 'The ID number for the given twoot.'
    }
  },
  resolve: twootWithParentResolver
}

export default twootWithParent
