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
      type: userInputType
    }
  },
  resolve: createUserResolver
}

export default createUser
