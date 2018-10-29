import {GraphQLObjectType} from 'graphql'
import createUser from 'mutations/createUser'

const rootMutation = new GraphQLObjectType({
  name: 'rootMutation',
  description: 'The root mutation that holds create, update, and destroy entrypoints.',
  fields: {
    createUser: createUser
  }
})

export default rootMutation
