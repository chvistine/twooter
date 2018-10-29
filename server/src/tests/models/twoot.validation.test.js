import models from 'models'
let user

describe('Twoot model', () => {
  describe('Validation', () => {
    beforeAll(async () => {
      try {
        await models.sequelize.sync()
        user = await models.User.create({
          username: 'username',
          password: 'password'
        })
      } catch (error) {
        console.error(error)
      }
    })
  
    afterAll(async () => {
      try {
        await models.User.destroy({where: {}})
        await models.Twoot.destroy({where: {}})
        await models.sequelize.close()
      } catch (error) {
        console.error(error)
      }
    })

    beforeEach(async () => {
      try {
        await models.Twoot.destroy({where: {}})
      } catch (error) {
        console.error(error)
      }
    })

    describe('Given a valid Twoot object', () => {
      it('Creates the twoot', async () => {
        expect.assertions(3)

        const twoot = {
          body: 'This is a test twoot.',
          authorID: user.id
        }

        const created = await models.Twoot.create(twoot)
        expect(created).not.toEqual(undefined)
        expect(created.body).toEqual('This is a test twoot.')
        expect(created.user).toEqual(user.id)
      })
    })

    describe("Given a Twoot body that's too long", () => {
      it('Throws a validation error', async () => {
        expect.assertions(2)

        const twoot = {
          body: 'This is a test twoot.'.repeat(200),
          authorID: user.id
        }

        try {
          const created = await models.Twoot.create(twoot)
          expect(created).toEqual(undefined)
        } catch (error) {
          expect(error).not.toEqual(undefined)
          expect(!!error.message.match(/twootTooLong/)).toEqual(true)
        }
      })
    })
  })
})