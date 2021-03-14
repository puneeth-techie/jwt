import { register, login, logout, refreshToken} from '../controllers/authController.js'
import express from 'express'

const router = express.Router();

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').delete(logout)
router.route('/refreshToken').post(refreshToken)

export default router;
