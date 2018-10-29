import responseType from 'types/responseType'
import userType from 'types/userType'
import currentUserResolver from 'resolvers/currentUserResolver'

const currentUser = {
  type: responseType(userType, 'currentUser', 'user'),
  description: 'Retrieves the currently logged in user.',
  resolve: currentUserResolver
}

export default currentUser
