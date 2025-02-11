const { configDotenv } = require('dotenv');
const express = require('express');
const dBConnect = require('./middlewares/dB');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json())
configDotenv()
dBConnect()


app.use(userRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server started on ${process.env.PORT}`)
})