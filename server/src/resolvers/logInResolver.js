import models from 'models'
import bcrypt from 'bcrypt'
import logUserIn from 'util/logUserIn'
import {notFoundResponse} from './errorResponses'

/* eslint-disable max-lines-per-function */
const logInResolver = async (_root, args, context) => {
  const user = await models.User.findOne({where: {
    username: args.input.username
  }})

  if (!user) {
    return notFoundResponse('user', 'logIn')
  }

  const validPassword = await bcrypt.compare(
    args.input.password,
    user.password
  )

  if (!validPassword) {
    return notFoundResponse('user', 'logIn')
  }

  logUserIn(user.id, context.res)

  return {
    status: 200,
    user: user
  }
}

export default logInResolver
