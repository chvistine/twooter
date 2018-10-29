import responseType from 'types/responseType'
import userType from 'types/userType'
import userInputType from 'types/userInputType'
import createUserResolver from 'resolvers/createUserResolver'

const createUser = {
  type: responseType(userType, 'createUser', 'user'),
  description: 'Creates a new user.',
  name: 'createUser',
  args: {
    input: {
      type: userInputType,
      description: 'The username and password for the user.'
    }
  },
  resolve: createUserResolver
}

export default createUser
