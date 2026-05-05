import { responseSender } from "../../utils/helpers/response-sender.js";
import { cheatedValidation } from "../auth/validations/auth.validation.js";
import userService from "./user.service.js";

class UserController {
    #userService = userService
    #cheatedValidation = cheatedValidation

    constructor() {
        this.show = this.show.bind(this)
        this.showOne = this.showOne.bind(this)
        this.createCheated = this.createCheated.bind(this)
        this.cheatedClear = this.cheatedClear.bind(this)
    }

    async show(req, res) {
        try {
            const { query } = req
            const page = Number(query?.page) || 1;
            const limit = Number(query?.limit) || 5;
            const search = query.search || ''

            const result = await this.#userService.show({ page, limit, search });

            if (result.error) {
                return responseSender(res, result.status, {
                    message: result.message,
                    data: null
                })
            }

            return responseSender(res, result.status, {
                message: result.message,
                data: result.data,
                pagination: result.pagination
            })
        } catch (error) {
            console.log(error);

            return responseSender(res, 500, {
                message: 'Internal Server Error!',
                data: null
            })
        }
    }

    async showOne(req, res) {
        try {
            const { user } = req

            return responseSender(res, 200, {
                message: 'success',
                data: user
            })
        } catch (error) {
            console.log(error);
            return responseSender(res, 500, {
                message: 'Internal Server Error!',
                data: null
            })
        }
    }

    async createCheated(req, res) {
        try {
            const { error, value } = this.#cheatedValidation.validate(req.body)
            const { user } = req;

            if (error) {
                return responseSender(res, 400, {
                    message: error.message,
                    data: null
                })
            }

            const result = await this.#userService.createCheated({ ...value, user_id: user?.id })

            if (result.error) {
                return responseSender(res, result.status, {
                    message: result.message,
                    data: null
                })
            }

            return responseSender(res, result.status, {
                message: result.message,
                data: result.data
            })
        } catch (error) {
            console.log(error);

            return responseSender(res, 500, {
                message: error || 'Internal Server Error!',
                data: null
            })
        }
    }

    async cheatedClear(req, res) {
        try {
            const { user } = req;
            const result = await this.#userService.cheatedClear(user?.id);

            if (result.error) {
                return responseSender(res, result.status, {
                    message: result.message,
                    data: null
                })
            }

            return responseSender(res, result.status, {
                message: result.message,
                data: result.data
            })
        } catch (error) {
            console.log(error);

            return responseSender(res, 500, {
                message: error || 'Internal Server Error!',
                data: null
            })
        }
    }
}

export default new UserController()
