import responseType from 'types/responseType'
import userType from 'types/userType'
import userInputType from 'types/userInputType'
import logInResolver from 'resolvers/logInResolver'

const logIn = {
  type: responseType(userType, 'logIn', 'user'),
  description: 'Logs into an existing user account.',
  name: 'logIn',
  args: {
    input: {
      type: userInputType,
      description: 'The username and password for the user account.'
    }
  },
  resolve: logInResolver
}

export default logIn
