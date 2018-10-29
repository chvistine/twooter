import models from 'models'
import {errorResponse, notFoundResponse} from './errorResponses'

/**
 * Given a twoot ID, returns the twoot and its author, along with
 * its parent twoot and author, if applicable.
 * 
 * @example
 * {
 *  status: 200,
 *  twoot: {
 *    id: 2,
 *    body: 'Twoot body.',
 *    author: {
 *      id: 1,
 *      username: 'username',
 *    },
 *    parentTwoot: {
 *      id: 1,
 *      body: 'Parent twoot.',
 *      author: {
 *        ...
 *      }
 *    }
 *  }
 * }
 * 
 */
const retrieveTwoot = async (id) => {
  return await models.Twoot.findOne({
    where: { id: id },
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
    }
    ]
  })
}

const twootWithParentResolver = async (_root, args) => {
  try {
    const twoot = await retrieveTwoot(args.id)

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
