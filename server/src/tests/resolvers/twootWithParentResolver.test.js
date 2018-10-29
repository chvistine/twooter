import models from 'models'
import twootWithParentResolver from 'resolvers/twootWithParentResolver'

let user
let parentTwoot
let childTwoot

describe('twootWithParentResolver', () => {
  beforeAll(async () => {
    try {
      await models.sequelize.sync({force: true})
    } catch (error) {
      console.error(error)
    }
  })

  afterAll(async () => {
    try {
      await models.sequelize.close()
    } catch (error) {
      console.error(error)
    }
  })

  afterEach(async () => {
    try {
      await models.User.destroy({where: {}})
      await models.Twoot.destroy({where: {}})
      await models.Like.destroy({where: {}})
    } catch (error) {
      console.error(error)
    }
  })

  describe('Given the ID of a twoot that has a parent twoot', () => {
    beforeAll(async () => {
      try {
        user = await models.User.create({
          username: 'username',
          password: 'password'
        })
        parentTwoot = await models.Twoot.create({
          body: 'This is the parent twoot.',
          authorID: user.id
        })
        childTwoot = await models.Twoot.create({
          body: 'This is the child twoot.',
          authorID: user.id,
          parentTwootID: parentTwoot.id
        })
      } catch (error) {
        console.error(error)
      }
    })

    it('Returns the twoot and parent twoot with their authors', async () => {
      expect.assertions(5)

      const args = {
        id: childTwoot.id
      }

      const response = await twootWithParentResolver(null, args)

      expect(response.status).toEqual(200)
      expect(response.twoot.body).toEqual(childTwoot.body)
      expect(response.twoot.author.id).toEqual(user.id)
      expect(response.twoot.parentTwoot.body).toEqual(parentTwoot.body)
      expect(response.twoot.parentTwoot.author.id).toEqual(user.id)
    })
  })

  describe("Given a twoot that doesn't have a parent twoot", () => {
    beforeAll(async () => {
      try {
        user = await models.User.create({
          username: 'username',
          password: 'password'
        })

        childTwoot = await models.Twoot.create({
          body: 'This is the child twoot.',
          authorID: user.id
        })
      } catch (error) {
        console.error(error)
      }
    })

    it('Returns the child twoot and author only', async () => {
      expect.assertions(4)

      const args = { id: childTwoot.id }
      const response = await twootWithParentResolver(null, args)

      expect(response.status).toEqual(200)
      expect(response.twoot.body).toEqual(childTwoot.body)
      expect(response.twoot.author.id).toEqual(user.id)
      expect(response.twoot.parentTwoot).toEqual(null)
    })
  })

  describe("Given a twoot ID that doesn't exist", () => {
    it('Returns a not found response', async () => {
      expect.assertions(3)

      const args = { id: 9001 }
      const response = await twootWithParentResolver(null, args)

      expect(response.status).toEqual(404)
      expect(response.twoot).toEqual(undefined)
      expect(response.requestErrors.name).toEqual('NotFoundError')
    })
  })

  describe("When there's an error", () => {
    it('Returns an error response', async () => {
      expect.assertions(3)

      const response = await twootWithParentResolver()
      
      expect(response.status).toEqual(500)
      expect(response.twoot).toEqual(undefined)
      expect(response.requestErrors.name).toEqual('TypeError')
    })
  })
})
