import {GraphQLObjectType} from 'graphql'
import currentUser from 'queries/currentUser'

const rootQuery = new GraphQLObjectType({
  name: 'rootQuery',
  description: 'The root query that holds all read entrypoints.',
  fields: {
    currentUser: currentUser
  }
})

export default rootQuery
