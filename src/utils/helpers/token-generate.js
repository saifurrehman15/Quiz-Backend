import jwt from 'jsonwebtoken'

export const generateToken = (payload) => {
    console.log(process.env.AUTH_SECRET);
    
    const access_token = jwt.sign(payload, process.env.AUTH_SECRET, { expiresIn: '2h' })
    const refresh_token = jwt.sign(payload, process.env.AUTH_SECRET, { expiresIn: '1d' })
    return { access_token, refresh_token }
}