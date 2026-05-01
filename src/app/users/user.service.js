import { pagination } from "../../utils/db/pagination.js"
import UserModel from "./model/user.model.js"
import { Op } from 'sequelize'

class UserService {
    #userModel = UserModel

    constructor() {
        this.show = this.show.bind(this)
    }

    async show(value) {
        const offset = (value.page - 1) * value.limit;

        const { rows, count } = await this.#userModel.findAndCountAll({
            where: {
                first_name: {
                    [Op.like]: `%${value?.search}%`
                }
            },
            attributes: { exclude: ['password'] },
            offset,
            limit: value?.limit,
            order: [['created_at', 'DESC']],
        })

        if (!rows) {
            return {
                error: true,
                message: "Users not found!",
                data: null,
                status: 404
            }
        }

        return {
            error: false,
            message: "Users fetched successfully!",
            status: 200,
            data: rows,
            pagination: { ...pagination({ count, limit: value?.limit, page: value?.page }) }
        }
    }
}

export default new UserService()
