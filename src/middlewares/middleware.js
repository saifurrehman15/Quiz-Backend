import UserModel from '../app/users/model/user.model.js'
import { responseSender } from "../utils/helpers/response-sender.js"
import jwt from 'jsonwebtoken'

class AuthenticateMiddleware {
    #userModel = UserModel
    constructor() {
        this.authenticateUser = this.authenticateUser.bind(this)
    }

    async authenticateUser(req, res, next) {
        try {
            const token = req.headers.authorization?.split(' ')[1]

            if (!token) return responseSender(res, 400, {
                error: true,
                message: 'Token is not provided!',
                data: null
            })

            const decoded = jwt.verify(token, process.env.AUTH_SECRET)
console.log(decoded);

            if (!decoded) {
                return responseSender(res, 401, {
                    error: true,
                    message: 'Unauthorized!',
                    data: null
                })
            }


            const findUser = await this.#userModel.findOne({
                where: { id: decoded.id },
                attributes: { exclude: ['password'] }
            })


            if (!findUser) {
                return responseSender(res, 403, {
                    error: true,
                    message: 'User not found!',
                    data: null
                })
            }

            const plain = findUser.get({ plain: true })
            delete plain.password

            req.user = plain
            next()
        } catch (error) {
            console.log('MIDDLEWARE ERROR', error);

            return responseSender(res, 500, {
                error: true,
                message: error.message || 'Internal Server Error!',
                data: null
            })
        }
    }
    checkRole(...allowed) {
        console.log(allowed);

        return (req, res, next) => {
            const ok = req?.user?.roles?.some(r =>
                allowed.includes(r?.name?.toLowerCase())
            )

            if (!ok) {
                return responseSender(res, 403, {
                    error: true,
                    message: 'Access denied!',
                    data: null
                })
            }

            next()
        }
    }

}

export default new AuthenticateMiddleware()