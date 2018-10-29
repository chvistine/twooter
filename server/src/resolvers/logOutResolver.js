const logOutResolver = (_root, _args, context) => {
  const options = {
    httpOnly: true,
    signed: true
  }

  context.res.clearCookie('token', options)

  return {
    status: 200,
    message: 'Sucessfullly logged out.'
  }
}

export default logOutResolver
