import models from 'models'

describe('User model', () => {
  describe('Validation', () => {
    beforeAll(async () => {
      try {
        await models.sequelize.sync()
      } catch (error) {
        console.error(error)
      }
    })
  
    afterAll(async () => {
      try {
        await models.User.destroy({where: {}})
        await models.sequelize.close()
      } catch (error) {
        console.error(error)
      }
    })

    beforeEach(async () => {
      try {
        await models.User.destroy({where: {}})
      } catch (error) {
        console.error(error)
      }
    })

    describe('Given a valid user object', () => {
      it('Creates the user without errors', async () => {
        expect.assertions(2)

        const user = {
          username: 'username',
          password: 'password'
        }

        const created = await models.User.create(user)
        expect(created).not.toEqual(undefined)
        expect(created.username).toEqual('username')
      }) 
    })

    describe('Given an empty username', () => {
      it('Throws a validation error', async () => {
        expect.assertions(1)

        const user = {
          username: '',
          password: 'password'
        }

        try {
          const created = await models.User.create(user)
          expect(created).toEqual(undefined)
        } catch (error) {
          expect(!!error.message.match(/usernameEmpty/)).toEqual(true)
        }
      })
    })

    describe("Given a username that's too short", () => {
      it('Throws a validation error', async () => {
        expect.assertions(1)

        const user = {
          username: 'user',
          password: 'password'
        }

        try {
          const created = await models.User.create(user)
          expect(created).toEqual(undefined)
        } catch (error) {
          expect(!!error.message.match(/usernameWrongLength/)).toEqual(true)
        }
      })
    })

    describe("Given a username that's too long", () => {
      it('Throws a validation error', async () => {
        expect.assertions(1)

        const user = {
          username: 'u'.repeat(35),
          password: 'password'
        }

        try {
          const created = await models.User.create(user)
          expect(created).toEqual(undefined)
        } catch (error) {
          expect(!!error.message.match(/usernameWrongLength/)).toEqual(true)
        }
      })
    })

    describe('Given a username with invalid characters', () => {
      it('Throws a validation error', async () => {
        expect.assertions(1)

        const user = {
          username: '&(*%^username',
          password: 'password'
        }

        try {
          const created = await models.User.create(user)
          expect(created).toEqual(undefined)
        } catch (error) {
          expect(!!error.message.match(/usernameInvalid/)).toEqual(true)
        }
      })
    })

    describe('Given an empty password', () => {
      it('Throws a validation error', async () => {
        expect.assertions(1)

        const user = {
          username: 'username',
          password: ''
        }

        try {
          const created = await models.User.create(user)
          expect(created).toEqual(undefined)
        } catch (error) {
          expect(!!error.message.match(/passwordEmpty/)).toEqual(true)
        }
      })
    })

    describe("Given a password that's too short", () => {
      it('Throws a validation error', async () => {
        expect.assertions(1)

        const user = {
          username: 'username',
          password: 'pass'
        }

        try {
          const created = await models.User.create(user)
          expect(created).toEqual(undefined)
        } catch (error) {
          expect(!!error.message.match(/passwordTooShort/)).toEqual(true)
        }
      })
    })
  })
})
