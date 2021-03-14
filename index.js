import app from './startup/app.js'
import connectDB from './startup/db.js'
import http from 'http'
import dotenv from 'dotenv'

const port = process.env.PORT || 5000
const server = http.createServer(app)

//init DB connection
connectDB();

//init server connection
server.listen(port, () => {
    console.log(`Server started listening on port ${port}`)
})