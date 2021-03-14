import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import createError from 'http-errors'
import authRoute from '../routes/authRoute.js'

//init .env
dotenv.config();

//init app
const app = express();

//use middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

//route handler
app.use('/api/users/auth', authRoute);

//create req/res pipeline error
app.use(async(req, res, next) => {
    next(createError.NotFound())
})

//error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })

})

export default app;