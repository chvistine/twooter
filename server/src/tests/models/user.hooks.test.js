import models from 'models'

describe('User model', () => {
  describe('Hooks', () => {
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

    it('Sets the username to lowercase', async () => {
      expect.assertions(1)

      const user = {
        username: 'UserName',
        password: 'password'
      }

      const created = await models.User.create(user)
      expect(created.username).toEqual('username')
    })

    it('Sets the username with original case as the display username', async () => {
      expect.assertions(1)

      const user = {
        username: 'UserName',
        password: 'password'
      }

      const created = await models.User.create(user)
      expect(created.displayUsername).toEqual('UserName')
    })

    it('Hashes the password', async () => {
      expect.assertions(1)

      const user = {
        username: 'UserName',
        password: 'password'
      }

      const created = await models.User.create(user)
      expect(created.password).not.toEqual('password')
    })
  })
})