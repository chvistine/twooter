import models from 'models'
import {errorResponse} from './errorResponses'

const createUserResolver = async ({input}) => {
  try {
    const created = await models.User.create({
      username: input.username,
      password: input.password
    })

    return {
      status: 201,
      user: created
    }
  } catch (error) {
    return errorResponse(error)
  }
}

export default createUserResolver
