import models from 'models'
import {notFoundResponse} from './errorResponses'

const currentUserResolver = async (_root, _args, context) => {
  const id = context.req.user && context.req.user.id

  if (!id) {
    return notFoundResponse('Current user', 'currentUser')
  }

  const user = await models.User.findOne({ where: { id: id } })

  if (!user) {
    return notFoundResponse('Current user', 'currentUser')
  }

  return {
    status: 200,
    user: user
  }
}

export default currentUserResolver
