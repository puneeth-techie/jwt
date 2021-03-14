const register = (req, res, next) => {
    res.send('Register route');
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