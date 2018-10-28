import {GraphQLInputObjectType, GraphQLString} from 'graphql'

const userInputType = new GraphQLInputObjectType({
  name: 'userInput',
  fields: {
    username: {
      type: GraphQLString,
      description: "The user's username."
    },
    password: {
      type: GraphQLString,
      description: "The user's password."
    }
  }
})

export default userInputType
