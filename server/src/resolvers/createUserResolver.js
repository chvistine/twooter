import models from 'models'
import {errorResponse} from './errorResponses'
import logUserIn from 'util/logUserIn'

const createUserResolver = async (_root, args, context) => {
  try {
    const created = await models.User.create({
      username: args.input.username,
      password: args.input.password
    })

    logUserIn(created.id, context.res)

    return {
      status: 201,
      user: created
    }
  } catch (error) {
    return errorResponse(error)
  }
}

export default createUserResolver
