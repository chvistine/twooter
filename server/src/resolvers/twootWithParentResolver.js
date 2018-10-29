import models from 'models'
import {errorResponse, notFoundResponse} from './errorResponses'

const twootWithParentResolver = async (_root, args) => {
  try {
    const twoot = await models.User.findOne({
      where: { id: args.id },
      include: [{
        model: models.User,
        as: 'author'
      }, {
        model: models.Twoot,
        as: 'parentTwoot',
        include: [{
          model: models.User,
          as: 'author'
        }]
      }]
    })

    if (!twoot) {
      return notFoundResponse('Twoot', 'twootWithParent')
    }

    return {
      status: 200,
      twoot: twoot
    }
  } catch (error) {
    return errorResponse(error)
  }
}

export default twootWithParentResolver
