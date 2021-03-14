import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'
import createError from 'http-errors'
import { validateUserSchema} from '../utils/validateSchema.js'

const register = async (req, res, next) => {
    try{
        const {error} = await validateUserSchema.validateAsync(req.body)
        if(error) throw createError.BadRequest(error.details[0].message);
        const {name, email, password} = req.body
        let user = await User.findOne({email})
        if(user) throw createError.Conflict(`${email} already registered. Please login.`)

        user = await User.create({name, email, password})
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }catch(error){
        if(error.isJoi === true) error.status = 422
        next(error)
    }
}

const login = (req, res, next) => {
    res.send('Login route');
}


const logout = (req, res, next) => {
    res.send('Logout route');
}

const refreshToken = (req, res, next) => {
    res.send('RT route');
}

export { register, login, logout, refreshToken}