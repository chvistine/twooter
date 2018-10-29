import * as responses from 'resolvers/errorResponses'
import models from 'models'

describe('errorResponses', () => {
  beforeAll(async () => {
    try {
      await models.sequelize.sync({force: true})
    } catch (error) {
      console.error(error)
    }
  })

  afterAll(async () => {
    try {
      await models.User.destroy({where:{}})
      await models.sequelize.close()
    } catch (error) {
      console.error(error)
    }
  })

  describe('notFoundResponse', () => {
    describe('Given an itemName and path', () => {
      it('Returns the right response', () => {
        const res = responses.notFoundResponse('itemName', 'path')
        expect(res.status).toEqual(404)
        expect(res.requestErrors.entries[0].message).toEqual('itemName does not exist.')
        expect(res.requestErrors.entries[0].path).toEqual('path')
      })
    })
  })

  describe('errorResponse', () => {
    describe('Given a generic error object', () => {
      it('Returns the right response', () => {
        expect.assertions(3)
        
        try {
          throw new Error('Error message.')
        } catch (error) {
          const res = responses.errorResponse(error)
          
          expect(res.status).toEqual(500)
          expect(res.requestErrors.name).toEqual('Error')
          expect(res.requestErrors.entries[0].message).toEqual('Error message.')
        }
      })
    })

    describe('Given a Sequelize validation error', () => {
      it('Returns the right response', async () => {
        expect.assertions(3)

        try {
          await models.User.create({
            username: 'user',
            password: 'password'
          })
        } catch (error) {
          const res = responses.errorResponse(error)
          expect(res.status).toEqual(400)
          expect(res.requestErrors.name).toEqual('SequelizeValidationError')
          expect(res.requestErrors.entries[0].message).toEqual('usernameWrongLength')
        }
      })
    })

    describe('Given a Sequelize unique constraint error', () => {
      it('Returns the right response', async () => {
        expect.assertions(3)

        try {
          const args = {
            username: 'username',
            password: 'password'
          }
          await models.User.create(args)
          await models.User.create(args)
        } catch (error) {
          const res = responses.errorResponse(error)
          expect(res.status).toEqual(409)
          expect(res.requestErrors.name).toEqual('SequelizeUniqueConstraintError')
          expect(res.requestErrors.entries[0].message).toEqual('usernameTaken')
        }
      })
    })
  })

  describe('unauthorizedResponse', () => {
    it('Returns an unauthorized response', () => {
      const res = responses.unauthorizedResponse
      expect(res.status).toEqual(401)
      expect(res.requestErrors.name).toEqual('Unauthorized')
    })
  })
})
