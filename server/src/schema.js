import rootMutation from 'rootMutation'
import rootQuery from 'rootQuery'
import {GraphQLSchema} from 'graphql'

const schema = new GraphQLSchema({
  mutation: rootMutation,
  query: rootQuery
})

export default schema
