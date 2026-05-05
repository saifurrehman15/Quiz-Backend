import { responseSender } from "../../utils/helpers/response-sender.js";
import { generateToken } from "../../utils/helpers/token-generate.js";
import authService from "./auth.service.js";
import { loginValidation, registerValidate } from "./validations/auth.validation.js"

class AuthController {
    #generateToken = (payload) => {
        const { access_token, refresh_token } = generateToken(payload)
        return { access_token, refresh_token }
    }
    #validateRegister = registerValidate
    #validateLogin = loginValidation
    #authService = authService

    constructor() {
        this.register = this.register.bind(this)
        this.login = this.login.bind(this)
        this.refreshToken = this.refreshToken.bind(this)
    }

    async register(req, res) {
        try {
            const { error, value } = this.#validateRegister.validate(req.body);
            if (error) {
                return responseSender(res, 400, {
                    message: error.message,
                    data: null
                })
            }

            const result = await this.#authService.register(value);

            if (result.error) {
                return responseSender(res, result.status, {
                    message: result.message,
                    data: null
                })
            }
            const payload = {
                id: result.data.id,
                email: result.data.email,
                roles: result.data?.roles || []
            }

            const { access_token, refresh_token } = this.#generateToken(payload)

            return responseSender(res, result.status, {
                message: result.message,
                data: result.data,
                token: {
                    access_token,
                    refresh_token,
                    expires_in: new Date().toISOString()
                }
            })
        } catch (error) {
            console.log(error);

            return responseSender(res, 500, {
                data: null,
                message: "Internal Server Error!"
            })
        }
    }

    async login(req, res) {
        try {
            const { error, value } = this.#validateLogin.validate(req.body);

            if (error) {
                return responseSender(res, 400, {
                    message: error.message,
                    data: null
                })
            }

            const result = await this.#authService.login(value);

            if (result.error) {
                return responseSender(res, result.status, {
                    message: result.message,
                    data: null
                })
            }
            const payload = {
                id: result.data.id,
                email: result.data.email,
                roles: result.data?.roles || []
            }

            const { access_token, refresh_token } = this.#generateToken(payload)

            return responseSender(res, result.status, {
                message: result.message,
                data: result.data,
                token: {
                    access_token,
                    refresh_token,
                }
            })
        } catch (error) {
            console.log(error);

            return responseSender(res, 500, {
                data: null,
                message: "Internal Server Error!"
            })
        }
    }

    async refreshToken(req, res) {
        try {
            const { user } = req
            const payload = {
                id: user?.id,
                email: user?.email
            }

            const { access_token, refresh_token } = this.#generateToken(payload);

            return responseSender(res, 200, {
                error: false,
                message: 'Token refreshed successfully!',
                data: {
                    token: {
                        access_token,
                        refresh_token
                    }
                }
            })
        } catch (error) {
            console.log(error);
            return responseSender(res, 500, {
                error: true,
                message: error.message || 'Internal Server Error!',
                data: null
            })
        }
    }
}

export default new AuthController()