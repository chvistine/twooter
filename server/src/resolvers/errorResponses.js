const errorStatus = (error) => {
  if (error.name === 'SequelizeValidationError') {
    return 400
  }

  if (error.name === 'SequelizeUniqueConstraintError') {
    return 409
  }

  if (error.name === 'InvalidCredentials') {
    return 401
  }

  if (error.name === 'NoCurrentUser') {
    return 404
  }

  return 500
}

export const errorResponse = (error) => {
  const status = errorStatus(error)

  return {
    status: status,
    requestErrors: {
      name: error.name,
      entries: error.errors
    }
  }
}

export const notFoundResponse = (itemName, path) => {
  return {
    status: 404,
    requestErrors: {
      name: 'NotFoundError',
      entries: [{
        message: `${itemName} does not exist.`,
        type: 'NotFoundError',
        path: path
      }]
    }
  }
}

export const unauthorizedResponse = {
  status: 401,
  requestErrors: {
    name: 'Unauthorized',
    entries: [{
      message: 'Unauthorized',
      type: 'Unauthorized'
    }]
  }
}
