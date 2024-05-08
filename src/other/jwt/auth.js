const jwt = require('jsonwebtoken')

const SECERT = 'hellojwt!'

// https://jwt.io/
function generateToken(payload) {
    return jwt.sign(payload, SECERT, { expiresIn: '5s' })
}

function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, SECERT)
        return decoded
    } catch (error) {
        console.error({ ...error })
        throw new Error('Invalid token')
    }
}

module.exports = {
    generateToken,
    verifyToken
}
