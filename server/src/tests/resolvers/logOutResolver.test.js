import logOutResolver from 'resolvers/logOutResolver'
import sinon from 'sinon'

describe('logOutResolver', () => {
  it('Clears the token cookie and returns a success response', () => {
    const context = {
      res: {
        clearCookie: sinon.spy()
      }
    }

    const response = logOutResolver(null, null, context)
    expect(response.status).toEqual(200)
    expect(response.message).not.toEqual(undefined)
    expect(context.res.clearCookie.called).toEqual(true)
    expect(context.res.clearCookie.calledWith('token')).toEqual(true)
  })
})
