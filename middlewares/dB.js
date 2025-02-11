const { configDotenv } = require('dotenv')
const mongoose = require('mongoose')

configDotenv()
const dBConnect = async (req,res) => {
    try{
    const db = await mongoose.connect(process.env.MONGODB_URL)
    return console.log('DB connected')
} catch(err) {
    return console.log('DB Error', err)
}
}

module.exports = dBConnect