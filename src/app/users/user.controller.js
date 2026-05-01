import { responseSender } from "../../utils/helpers/response-sender.js";
import userService from "./user.service.js";

class UserController {
    #userService = userService

    constructor() {
        this.show = this.show.bind(this)
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
}

export default new UserController()
