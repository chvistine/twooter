import createUserResolver from 'resolvers/createUserResolver'
import models from 'models'
import sinon from 'sinon'

let context

describe('createUserResolver', () => {
  beforeAll(async () => {
    try {
      await models.sequelize.sync()
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

  beforeEach(async () => {
    try {
      await models.User.destroy({where: {}})
      context.res.cookie.resetHistory()
    } catch (error) {
      console.log(error)
    }
  })

  describe('Given a valid username and password', () => {
    it('Returns a success response', async () => {
      expect.assertions(3)

      const args = {
        input: {
          username: 'username',
          password: 'password'
        }
      }

      const response = await createUserResolver(null, args, context)
      expect(response.requestErrors).toEqual(undefined)
      expect(response.status).toEqual(201)
      expect(response.user.username).toEqual('username')
    })

    it('Creates a user account', async () => {
      expect.assertions(2)

      const args = {
        input: {
          username: 'username',
          password: 'password'
        }
      }

      await createUserResolver(null, args, context)
      const created = await models.User.findOne({where: {
        username: 'username'
      }})
      expect(created).not.toEqual(undefined)
      expect(created.username).toEqual('username')
    })

    it('Logs the user in to the new account', async () => {
      expect.assertions(2)

      const args = {
        input: {
          username: 'username',
          password: 'password'
        }
      }

      await createUserResolver(null, args, context)
      expect(context.res.cookie.called).toEqual(true)
      expect(context.res.cookie.calledWith('token')).toEqual(true)
    })
  })

  describe('Given an invalid username or password', () => {
    it('Returns an error response', async () => {
      expect.assertions(2)

      const args = {
        input: {
          username: 'user',
          password: 'pass'
        }
      }

      const response = await createUserResolver(null, args, context)
      expect(response.status).toEqual(400)
      expect(response.requestErrors.name).toEqual('SequelizeValidationError')
    })
  })

  describe('Given a username that already exists', () => {
    it('Returns an error response', async () => {
      expect.assertions(2)

      const args = {
        input: {
          username: 'username',
          password: 'password'
        }
      }

      await createUserResolver(null, args, context)
      const response = await createUserResolver(null, args, context)
      expect(response.status).toEqual(409)
      expect(response.requestErrors.name).toEqual('SequelizeUniqueConstraintError')
    })
  })
})
