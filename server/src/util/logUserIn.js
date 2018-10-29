import jwt from 'jsonwebtoken'
import config from 'config'

const logUserIn = (userID, res) => {
  const twoWeeks = 14 * 24 * 60 * 60 * 1000

  const options = {
    httpOnly: true,
    signed: true, 
    maxAge: twoWeeks
  }

  const token = jwt.sign(
    { id: userID },
    config.secretKey,
    { expiresIn: '14d' }
  )

  res.cookie('token', token, options)
}

export default logUserIn
