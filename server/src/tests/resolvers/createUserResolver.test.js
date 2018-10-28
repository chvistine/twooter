import createUserResolver from 'resolvers/createUserResolver'
import models from 'models'

describe('createUserResolver', () => {
  beforeAll(async () => {
    try {
      await models.sequelize.sync()
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

      try {
        const response = await createUserResolver(args)
        expect(response.requestErrors).toEqual(undefined)
        expect(response.status).toEqual(201)
        expect(response.user.username).toEqual('username')
      } catch (error) {
        expect(error).toEqual(undefined)
      }
    })

    it('Creates a user account', async () => {
      expect.assertions(2)

      const args = {
        input: {
          username: 'username',
          password: 'password'
        }
      }

      try {
        await createUserResolver(args)
        const created = await models.User.find({where: {
          username: 'username'
        }})
        expect(created).not.toEqual(undefined)
        expect(created.username).toEqual('username')
      } catch (error) {
        expect(error).toEqual(undefined)
      }
    })
  })

  describe('Given an invalid username or password', () => {
    it('Returns an error response', async () => {

    })
  })
})
