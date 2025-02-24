const { configDotenv } = require('dotenv');
const express = require('express');
const dBConnect = require('./middlewares/dB');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes')

const app = express();
app.use(express.json())
configDotenv()
dBConnect()


app.use(userRoutes)
app.use(productRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server started on ${process.env.PORT}`)
})