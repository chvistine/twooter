import logInResolver from 'resolvers/logInResolver'
import models from 'models'
import sinon from 'sinon'

let context

describe('logInResolver', () => {
  beforeAll(async () => {
    try {
      await models.sequelize.sync()
      await models.User.create({
        username: 'username',
        password: 'password'
      })
      context = {
        res: {
          cookie: sinon.spy()
        }
      }
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

  beforeEach(() => {
    context.res.cookie.resetHistory()
  })

  describe('Given a valid username and password', () => {
    it('Returns a success response', async () => {
      expect.assertions(2)

      const args = {
        input: {
          username: 'username',
          password: 'password'
        }
      }

      const response = await logInResolver(null, args, context)
      expect(response.status).toEqual(200)
      expect(response.user.username).toEqual('username')
    })

    it('Sets a cookie with the JWT', async () => {
      expect.assertions(2)

      const args = {
        input: {
          username: 'username',
          password: 'password'
        }
      }

      await logInResolver(null, args, context)
      expect(context.res.cookie.called).toEqual(true)
      expect(context.res.cookie.calledWith('token')).toEqual(true)
    })
  })

  describe("Given a username that doesn't exist", () => {
    it('Returns a not found response', async () => {
      expect.assertions(2)

      const args = {
        input: {
          username: 'not_a_username',
          password: 'password'
        }
      }

      const response = await logInResolver(null, args, context)
      expect(response.status).toEqual(404)
      expect(response.requestErrors.name).toEqual('NotFoundError')
    })
  })

  describe('Given the wrong password for an existing username', () => {
    it('Returns a not found response', async () => {
      expect.assertions()

      const args = {
        input: {
          username: 'username',
          password: 'wrong_password'
        }
      }

      const response = await logInResolver(null, args, context)
      expect(response.status).toEqual(404)
      expect(response.requestErrors.name).toEqual('NotFoundError')
    })
  })
})