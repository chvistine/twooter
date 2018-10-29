import models from 'models'
import currentUserResolver from 'resolvers/currentUserResolver'

let existingID

describe('currentUserResolver', () => {
  beforeAll(async () => {
    try {
      await models.sequelize.sync()
      const user = await models.User.create({
        username: 'username',
        password: 'password'
      })
      existingID = user.id
    } catch (error) {
      console.log(error)
    }
  })

  afterAll(async () => {
    try {
      await models.User.destroy({where: {}})
      await models.sequelize.close()
    } catch (error) {
      console.log(error)
    }
  })

  describe('Given an existing user ID', () => {
    it('Returns a success response with the user account', async () => {
      expect.assertions(3)

      const context = {
        req: {
          user: {
            id: existingID
          }
        }
      }

      const response = await currentUserResolver(null, null, context)
      expect(response.status).toEqual(200)
      expect(response.user.username).toEqual('username')
      expect(response.user.id).toEqual(existingID)
    })
  })

  describe('Given a context object without a user', () => {
    it('Returns a not found response', async () => {
      expect.assertions(2)

      const context = {
        req: {
          user: undefined
        }
      }

      const response = await currentUserResolver(null, null, context)
      expect(response.status).toEqual(404)
      expect(response.requestErrors.name).toEqual('NotFoundError')
    })
  })

  describe("Given a user ID that doesn't exist", () => {
    it('Returns a not found response', async () => {
      expect.assertions(2)

      let ID = 9001
      ID = ID === existingID ? 9002 : ID

      const context = {
        req: {
          user: {
            id: ID
          }
        }
      }

      const response = await currentUserResolver(null, null, context)
      expect(response.status).toEqual(404)
      expect(response.requestErrors.name).toEqual('NotFoundError')
    })
  })
})
