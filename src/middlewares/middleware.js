import { CheatModel, Role } from '../app/auth/model/auth.model.js'
import UserModel from '../app/auth/model/auth.model.js'
import { responseSender } from "../utils/helpers/response-sender.js"
import jwt from 'jsonwebtoken'

class AuthenticateMiddleware {
    #userModel = UserModel
    #cheatModel = CheatModel

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
                attributes: { exclude: ['password'] },
                include: [{
                    model: Role, as: 'roles', attributes: ['id', 'name'],
                    through: { attributes: [] }
                }]
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

            const foundCheated = await this.#cheatModel.findOne({
                where: {
                    user_id: plain?.id
                }
            })

            req.user = { ...plain, ...(foundCheated ? { foundCheated } : {}) }
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