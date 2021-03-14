import express from 'express'
import morgan from 'morgan'
import createError from 'http-errors'
import authRoute from '../routes/authRoute.js'

const app = express();

app.use(express.json())

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

app.use('/api/users/auth', authRoute);

app.use(async(req, res, next) => {
    next(createError.NotFound())
})

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