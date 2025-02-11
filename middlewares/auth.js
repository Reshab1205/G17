const jwt = require('jsonwebtoken')

const auth = (req,res,next) => { 
    try {
    const token = req.headers['authorization']
    console.log('token', token)
    if(!token) {
       return next()
    }
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY)
    console.log('verifyToken', verifyToken)
    req.user = verifyToken
     return next()

} catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token' });
}
}
module.exports = auth